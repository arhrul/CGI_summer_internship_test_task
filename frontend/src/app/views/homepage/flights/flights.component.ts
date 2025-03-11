import {Component, OnInit} from '@angular/core';
import {FlightService} from '../../../core/services/flightService/flight.service';
import {Flight} from '../../../core/model/Flight';
import {NgForOf, NgIf} from '@angular/common';
import {SearchCriteria} from '../../../core/model/SearchCriteria';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-flights',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './flights.component.html',
  standalone: true,
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightService) {

  }

  ngOnInit(): void {
  }

  getFlights(searchCriteria: SearchCriteria): void {

    this.flightService.searchFlights(searchCriteria).subscribe({
      next: (data) => {
        this.flights = data;
        console.log('Flights received:', this.flights);
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
}
