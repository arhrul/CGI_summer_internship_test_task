import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Flight} from '../../model/Flight';
import {SearchCriteria} from '../../model/SearchCriteria';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://localhost:8080/flight'
  private flightFormData = new BehaviorSubject<FormGroup | null>(null);
  private selectedFlight: any;
  flightFormData$ = this.flightFormData.asObservable();

  constructor(private http: HttpClient) { }

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



  formatPrice(value: number): string {
    return value.toFixed(2)
  }



  setSelectedFlight(flight: any) {
    this.selectedFlight = flight;
  }

  getSelectedFlight() {
    return this.selectedFlight;
  }

  setFlightFormData(form: FormGroup) {
    this.flightFormData.next(form);
  }

  getFlightById(id: number) {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`)
  }

  createFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.apiUrl, flight)
  }

  deleteFlight(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  searchFlights(searchCriteria: SearchCriteria): Observable<Flight[]> {
    let params = new HttpParams();
    params = params.set('departure', searchCriteria.departure)
    params = params.set('destination', searchCriteria.destination)
    params = params.set('departureTime', searchCriteria.date.toString())
    params = params.set('numberOfPeople', searchCriteria.numberOfPeople)
    params = params.set('durationStartTime', searchCriteria.durationStartTime)
    params = params.set('durationEndTime', searchCriteria.durationEndTime)
    params = params.set('departureStartTime', searchCriteria.departureStartTime)
    params = params.set('departureEndTime', searchCriteria.departureEndTime)
    params = params.set('priceStart', searchCriteria.priceStart)
    params = params.set('priceEnd', searchCriteria.priceEnd)
    return this.http.get<any>(`${this.apiUrl}/search`, {params}).pipe(
    map(response => response.content || response)
    )
  }
}
