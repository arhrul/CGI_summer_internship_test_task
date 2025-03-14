import {Component, OnInit} from '@angular/core';
import {FlightService} from '../../../core/services/flightService/flight.service';
import {Flight} from '../../../core/model/Flight';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {SearchCriteria} from '../../../core/model/SearchCriteria';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatSlider, MatSliderModule, MatSliderRangeThumb} from '@angular/material/slider';



@Component({
  selector: 'app-flights',
  imports: [
    NgForOf,
    NgIf,
    NgStyle,
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

  constructor(private flightService: FlightService, private readonly formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getForm()
  }

  getForm() {
    this.flightService.flightFormData$.subscribe((form) => {
      if (form) {
        this.flightsForm = form
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
      this.getFlights(this.flightsForm.value)
    }
    if (this.flightsForm) {
      console.log("Form updated!", this.flightsForm.value)
    }

  }

  getFlights(searchCriteria: SearchCriteria): void {
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

  getDepartureTime(flight: Flight) {
    const departureDate = new Date(flight.departureTime)
    const hours = departureDate.getHours().toString().padStart(2, '0');
    const minutes = departureDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calculateDestination(flight: Flight) {
    const departureDate: Date = new Date(flight.departureTime)
    const destinationDate: Date = new Date(flight.departureTime)
    const duration: number = flight.duration
    destinationDate.setMinutes(departureDate.getMinutes() + duration)
    return destinationDate
  }

  getDestinationTime(flight: Flight) {
    const destinationDate: Date = this.calculateDestination(flight)
    const hours = destinationDate.getHours().toString().padStart(2, '0');
    const minutes = destinationDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getDepartureDate(flight: Flight) {
    const departureDate: Date = new Date(flight.departureTime)
    const dayOfWeek = departureDate.toLocaleString('en-US', { weekday: 'short' });
    const day = departureDate.getDate()
    const month = departureDate.toLocaleString('en-US', { month: 'short' });
    const year = departureDate.getFullYear()
    return `${dayOfWeek}, ${day} ${month} ${year}`
  }

  getDestinationDate(flight: Flight) {
    const destinationDate: Date = this.calculateDestination(flight)
    const dayOfWeek = destinationDate.toLocaleString('en-US', { weekday: 'short' });
    const day = destinationDate.getDate()
    const month = destinationDate.toLocaleString('en-US', { month: 'short' });
    const year = destinationDate.getFullYear()
    return `${dayOfWeek}, ${day} ${month} ${year}`
  }

  formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursFormatted = hours.toString().padStart(2, '0');
    const minutesFormatted = minutes.toString().padStart(2, '0');

    return `${hoursFormatted}h ${minutesFormatted}min`;

  }

  formatTime(value: number): string {
    const hours = Math.floor(value / 2);
    const minutes = (value % 2) * 30;

    if (value === 48) {
      return `23:59`;
    }

    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  formatPrice(value: number): string {
    return value.toFixed(2)
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onTimeSliderChange(event: any): void {
    this.updateForm()
  }

  onDurationSliderChange(event: any): void {
    this.updateForm()
  }

  onPriceSliderChange(event: any): void {
    this.updateForm()
  }
}
