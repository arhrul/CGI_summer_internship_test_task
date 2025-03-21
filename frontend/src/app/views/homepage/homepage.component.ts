import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../core/services/imageService/image.service';
import {NgForOf, NgStyle} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FlightsComponent} from './flights/flights.component';
import {Flight} from '../../core/model/Flight';
import {FlightService} from '../../core/services/flightService/flight.service';
import {FooterComponent} from '../footer/footer.component';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-homepage',
  imports: [
    NgStyle,
    HeaderComponent,
    ReactiveFormsModule,
    NgForOf,
    FlightsComponent,
    FooterComponent,
  ],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  @ViewChild(FlightsComponent) flightsComponent!: FlightsComponent;
  bgPic: string
  flights: Flight[] = []
  cities: { name: string; value: string }[] = []
  flightsForm!: FormGroup


  constructor(
    private imageService: ImageService,
    private flightService: FlightService,
    private readonly formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.bgPic = imageService.bgPic

    this.flightsForm = this.formBuilder.group({
      departure: [''],
      destination: [''],
      date: [''],
      numberOfPeople: [1],
      departureStartTime: [''],
      departureEndTime: [''],
      durationStartTime: [''],
      durationEndTime: [''],
      priceStart: [''],
      priceEnd: ['']
    });
  }

  ngOnInit(): void {
    this.getFlights()
    this.flightService.setFlightFormData(this.flightsForm)
  }

  onSubmit() {
    if (this.authService.isLoggedIn()) {
      if (this.flightsForm.valid) {
        const searchCriteria = this.flightsForm.value;
        this.flightService.setFlightFormData(this.flightsForm);
        this.flightsComponent.searchFlights(searchCriteria);
      }
    } else {
      this.router.navigate(['/login'])
    }

  }

  getFlights() {
    this.flightService.getFlights().subscribe({
      next: (data) => {
        this.flights = data;
        console.log('Flights received:', this.flights);
        this.flightsComponent.flights = data
        this.getUniqueCities()
      },
      error: (err) => {
        console.error('Error fetching flights:', err);
      }
    });
  }

  getUniqueCities() {
    this.cities = [
      ...new Set(this.flights.flatMap(flight => [flight.departure, flight.destination]))
    ].map(city => ({value: city, name: city}));
  }

}
