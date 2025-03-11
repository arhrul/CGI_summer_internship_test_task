import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Flight} from '../../model/Flight';
import {SearchCriteria} from '../../model/SearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://localhost:8080/flight'

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  searchFlights(searchCriteria: SearchCriteria): Observable<Flight[]> {
    let params = new HttpParams();
    params = params.set('departure', searchCriteria.departure)
    params = params.set('destination', searchCriteria.destination)
    params = params.set('departureTime', searchCriteria.date.toString())
    params = params.set('numberOfPeople', searchCriteria.numberOfPeople)
    return this.http.get<any>(`${this.apiUrl}/search`, {params}).pipe(
    map(response => response.content || response)
    )
  }
}
