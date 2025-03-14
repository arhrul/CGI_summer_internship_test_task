import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Seat} from '../../model/Seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'http://localhost:8080/seat'

  constructor(private http: HttpClient) { }

  getSeatsByFlightId(flightId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/flight/${flightId}`)
  }
}
