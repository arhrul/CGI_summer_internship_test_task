import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Seat} from '../../model/Seat';
import {SeatClass} from '../../enums/SeatClass';
import {SeatPlace} from '../../enums/SeatPlace';
import {LegSpace} from '../../enums/LegSpace';
import {SeatSearchCriteria} from '../../model/SeatSearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'http://localhost:8080/seat'

  constructor(private http: HttpClient) { }

  getSeatClassValues() {
    return Object.values(SeatClass)
  }

  getSeatPlaceValues() {
    return Object.values(SeatPlace)
  }

  getLegSpaceValues() {
    return Object.values(LegSpace)
  }

  getSeatsByFlightId(flightId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/flight/${flightId}`)
  }

  getSeats() {
    return this.http.get<Seat[]>(this.apiUrl)
  }

  getSeatById(id: number): Observable<Seat> {
    return this.http.get<Seat>(`${this.apiUrl}/${id}`)
  }

  createSeat(seat: Seat): Observable<Seat> {
    return this.http.post<Seat>(this.apiUrl, seat)
  }

  createSeatsForFlight(flightId: number): Observable<Seat[]> {
    return this.http.post<Seat[]>(`${this.apiUrl}/flight/${flightId}`, null)
  }

  deleteSeat(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  searchSeats(seatSearchCriteria: SeatSearchCriteria): Observable<Seat[]> {
    let params = new HttpParams()
    params = params.set('flightId', seatSearchCriteria.flightId)
    params = params.set('place', seatSearchCriteria.place)
    params = params.set('legSpace', seatSearchCriteria.legSpace)
    params = params.set('seatClass', seatSearchCriteria.seatClass)
    return this.http.get<any>(`${this.apiUrl}/search`, {params}).pipe(
      map(response => response.content || response)
    )
  }
}
