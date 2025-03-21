import {Component, OnInit} from '@angular/core';
import {FlightService} from '../../core/services/flightService/flight.service';
import {SeatService} from '../../core/services/seatService/seat.service';
import {Flight} from '../../core/model/Flight';
import {Seat} from '../../core/model/Seat';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SeatClass} from '../../core/enums/SeatClass';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-seats',
  imports: [
    NgForOf,
    NgClass,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    FooterComponent,
  ],
  templateUrl: './seats.component.html',
  standalone: true,
  styleUrl: './seats.component.css'
})
export class SeatsComponent implements OnInit {
  flightId: number = 0
  flight!: Flight
  seats: Seat[] = []
  windowLeft: Seat[] = [];
  middleLeft: Seat[] = [];
  aisleLeft: Seat[] = [];
  aisleRight: Seat[] = [];
  middleRight: Seat[] = [];
  windowRight: Seat[] = [];

  seatPlaceValues: string[] = [];
  legSpaceValues: string[] = [];
  seatClassValues: string[] = []

  selectedSeat!: Seat

  seatsForm!: FormGroup
  foundSeats: Seat[] = []

  constructor(private route: ActivatedRoute,
              private flightService: FlightService,
              private seatService: SeatService,
              private readonly formBuilder: FormBuilder) {
    this.seatPlaceValues = seatService.getSeatPlaceValues()
    this.legSpaceValues = seatService.getLegSpaceValues()
    this.seatClassValues = seatService.getSeatClassValues()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const flightId = Number(params.get('id'));
      if (flightId) {
        this.flightId = flightId
        this.getSeats(flightId);
        this.createForm()
        this.getFlight(this.flightId)
        console.log("Flight id", this.flightId)
      }
    });
  }

  getFlight(flightId: number) {
    this.flightService.getFlightById(flightId).subscribe({
      next: (data) => {
        this.flight = data
      }
    })
  }

  createForm() {
    this.seatsForm = this.formBuilder.group({
      flightId: [this.flightId],
      place: [''],
      legSpace: [''],
      seatClass: ['']
    })
  }

  isFound(seat: Seat) {
    return this.foundSeats.some(foundSeat => foundSeat.number === seat.number);
  }

  trackBySeat(index: number, seat: Seat) {
    return seat.number;
  }

  onSearch() {
    if (this.seatsForm.valid) {
      const seatSearchCriteria = this.seatsForm.value
      this.seatService.searchSeats(seatSearchCriteria).subscribe({
        next: (data) => {
          this.foundSeats = data
          console.log("Found Seats", data)
        },
        error: (err) => {
          console.error("Error fetching seats", err)
        }
      })
    }
  }

  assignSelectedSeat() {
    for (let i = 0; i < this.seats.length; i++) {
      let seat: Seat = this.seats[i]
      if (seat.isAvailable) {
        this.selectedSeat = seat
        return
      }
    }
  }

  onSeatClick(seat: Seat) {
    this.selectedSeat = seat
  }

  getSeats(flightId: number) {
    this.seatService.getSeatsByFlightId(flightId).subscribe({
      next: (data) => {
        this.seats = data
        this.assignSeatsToCategories();
        this.assignSelectedSeat()

      }
    })
    console.log(this.seats)
  }



  assignSeatsToCategories() {
    this.seats.forEach((seat, index) => {
      const positionInRow = index % 6;

      switch (positionInRow) {
        case 0:
          this.windowLeft.push(seat);
          break;
        case 1:
          this.middleLeft.push(seat);
          break;
        case 2:
          this.aisleLeft.push(seat);
          break;
        case 3:
          this.aisleRight.push(seat);
          break;
        case 4:
          this.middleRight.push(seat);
          break;
        case 5:
          this.windowRight.push(seat);
          break;
      }
    });
    console.log(this.windowLeft)
  }

  getDepartureDate() {
    return this.flightService.getDepartureDate(this.flight)
  }

  getDepartureTime() {
    return this.flightService.getDepartureTime(this.flight)
  }

  getDestinationTime() {
    return this.flightService.getDestinationTime(this.flight)
  }
}
