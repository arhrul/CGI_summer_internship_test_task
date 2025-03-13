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
  flightFormData$ = this.flightFormData.asObservable();

  constructor(private http: HttpClient) { }

  setFlightFormData(form: FormGroup) {
    this.flightFormData.next(form);
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
    return this.http.get<any>(`${this.apiUrl}/search`, {params}).pipe(
    map(response => response.content || response)
    )
  }
}
