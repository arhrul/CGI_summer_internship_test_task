import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FlightService} from '../../../core/services/flightService/flight.service';
import {Flight} from '../../../core/model/Flight';
import {NgForOf} from '@angular/common';
import {FlightStatus} from '../../../core/enums/FlightStatus';

@Component({
  selector: 'app-flight-management',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './flight-management.component.html',
  standalone: true,
  styleUrl: './flight-management.component.css'
})
export class FlightManagementComponent implements OnInit {
  flightForm!: FormGroup;
  flights: Flight[] = []

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.fetchFlights()
  }

  fetchFlights() {
    this.flightService.getFlights().subscribe({
      next: (data) => {
        this.flights = data
      }
    })
  }

  createForm() {
    this.flightForm = this.formBuilder.group({
      departure: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      departureTime: ['', Validators.required],
      status: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.flightForm.invalid) {
      return;
    }

    const newFlight = this.flightForm.value;
    const departureDateTime = `${newFlight.departureDate}T${newFlight.departureTime}:00`

    const flightData = {
      ...newFlight,
      departureTime: departureDateTime
    };
    this.flightService.createFlight(flightData).subscribe({
      next: (room) => {
        console.log('Flight created successfully:', room);
        this.flightForm.reset();
      },
      error: (error) => {
        console.error('Error creating flight:', error);
      }
    });
  }

  getFlightStatusValues() {
    return Object.values(FlightStatus)
  }

  deleteFlight(id: number) {
    this.flightService.deleteFlight(id).subscribe({
      next: () =>
        this.flights = this.flights.filter(flight => flight.id !== id)
    })
  }
}
