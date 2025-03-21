import {Component, OnInit} from '@angular/core';
import {FlightService} from '../../../core/services/flightService/flight.service';
import {Flight} from '../../../core/model/Flight';
import {NgForOf, NgIf} from '@angular/common';
import {SearchCriteria} from '../../../core/model/SearchCriteria';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatSlider, MatSliderModule, MatSliderRangeThumb} from '@angular/material/slider';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/authentication/authentication.service';



@Component({
  selector: 'app-flights',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatSlider,
    MatSliderRangeThumb,
    MatSliderModule
  ],
  templateUrl: './flights.component.html',
  standalone: true,
  styleUrl: './flights.component.css',
})
export class FlightsComponent implements OnInit {
  flights: Flight[] = [];

  startTime: number = 0;
  endTime: number = 48

  startDuration = 0
  endDuration = 30

  startPrice = 0
  endPrice = 1000

  flightsForm: FormGroup | null = null
  numberOfPeople: number = 1

  constructor(private flightService: FlightService,
              private readonly formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.getForm()
  }

  onBookNow(flight: any) {
    if (this.authService.isLoggedIn()) {
      this.flightService.setSelectedFlight(flight);
      console.log(this.numberOfPeople)
      this.router.navigate(['/seats', flight.id, this.numberOfPeople])
    } else {
      this.router.navigate(['/login'])
    }

  }

  getForm() {
    this.flightService.flightFormData$.subscribe((form) => {
      if (form) {
        this.flightsForm = form
        this.numberOfPeople = form.get('numberOfPeople')?.value
      }
    })
  }

  updateForm() {
    if (this.flightsForm) {
      this.flightsForm.patchValue({
        durationStartTime: this.startDuration * 60,
        durationEndTime: this.endDuration * 60,
        departureStartTime: this.startTime,
        departureEndTime: this.endTime,
        priceStart: this.startPrice,
        priceEnd: this.endPrice
      })
      this.flightService.setFlightFormData(this.flightsForm)
      this.searchFlights(this.flightsForm.value)
    }
    if (this.flightsForm) {
      console.log("Form updated!", this.flightsForm.value)
    }

  }

  searchFlights(searchCriteria: SearchCriteria): void {
    console.log("Search Criteria",searchCriteria)
    this.flightService.searchFlights(searchCriteria).subscribe({
      next: (data) => {
        this.flights = data;
        console.log('Flights received:', data);
      },
      error: (err) => {
        console.error('Error fetching flights:', err);
      }
    });
  }


  onTimeSliderChange(): void {
    this.updateForm()
  }

  onDurationSliderChange(): void {
    this.updateForm()
  }

  onPriceSliderChange(): void {
    this.updateForm()
  }

  getDepartureTime(flight: Flight) {
    return this.flightService.getDepartureTime(flight);
  }

  getDepartureDate(flight: Flight) {
    return this.flightService.getDepartureDate(flight);
  }

  getDestinationTime(flight: Flight) {
    return this.flightService.getDestinationTime(flight);
  }

  getDestinationDate(flight: Flight) {
    return this.flightService.getDestinationDate(flight);
  }

  formatDuration(duration: number) {
    return this.flightService.formatDuration(duration);
  }

  formatPrice(price: number) {
    return this.flightService.formatPrice(price);
  }

  formatTime(value: number): string {
    const hours = Math.floor(value / 2);
    const minutes = (value % 2) * 30;

    if (value === 48) {
      return `23:59`;
    }
    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
