import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../core/services/imageService/image.service';
import {NgForOf, NgStyle} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FlightsComponent} from './flights/flights.component';
import {Flight} from '../../core/model/Flight';
import {FlightService} from '../../core/services/flightService/flight.service';
import {FooterComponent} from '../footer/footer.component';
import {SearchCriteria} from '../../core/model/SearchCriteria';

@Component({
  selector: 'app-homepage',
  imports: [
    NgStyle,
    HeaderComponent,
    ReactiveFormsModule,
    NgForOf,
    FlightsComponent,
    FooterComponent
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
    private readonly formBuilder: FormBuilder
  ) {
    this.bgPic = imageService.bgPic
  }

  ngOnInit(): void {
    this.getFlights()
    this.createForm()
  }

  onSubmit() {
    if (this.flightsForm.valid) {
      console.log('Form submited!', this.flightsForm.value);
      const searchCriteria = this.flightsForm.value;
      this.flightsComponent.getFlights(searchCriteria);
    }
  }

  createForm() {
    this.flightsForm = this.formBuilder.group({
      departure: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      date: ['', [Validators.required]],
      numberOfPeople: ['', Validators.required]
    });

  }

  getFlights() {
    this.flightService.getFlights().subscribe({
      next: (data) => {
        this.flights = data;
        console.log('Flights received:', this.flights);
        this.getUniqueCities()
      },
      error: (err) => {
        console.error('Error fetching flights:', err);
      }
    });
  }

  getUniqueCities() {
    const uniqueCities = [
      ...new Set(this.flights.flatMap(flight => [flight.departure, flight.destination]))
    ].map(city => ({ value: city, name: city }));

    console.log(uniqueCities);
    this.cities = uniqueCities;
  }

}
