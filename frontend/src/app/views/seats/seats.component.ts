import {Component, OnInit} from '@angular/core';
import {FlightService} from '../../core/services/flightService/flight.service';
import {SeatService} from '../../core/services/seatService/seat.service';
import {Flight} from '../../core/model/Flight';
import {Seat} from '../../core/model/Seat';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from '../footer/footer.component';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';

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

  selectedSeatPrice = 0

  selectedSeats: { seat: Seat, passengerIndex: number }[] = []
  selectedPassenger = 1

  seatsForm!: FormGroup
  foundSeats: Seat[] = []


  departure = ''
  destination = ''
  departureDate = ''
  departureTime = ''
  destinationTime = ''

  numberOfPeople = 1

  constructor(private route: ActivatedRoute,
              private flightService: FlightService,
              private seatService: SeatService,
              private readonly formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
    this.seatPlaceValues = seatService.getSeatPlaceValues()
    this.legSpaceValues = seatService.getLegSpaceValues()
    this.seatClassValues = seatService.getSeatClassValues()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const flightId = Number(params.get('flightId'));
      if (flightId) {
        this.flightId = flightId
        this.getSeats(flightId);
        this.createForm()
        this.getFlight(this.flightId)
      }

      const numberOfPeople = Number(params.get('numberOfPeople'))
      if (numberOfPeople) {
        this.numberOfPeople = numberOfPeople
      }
    });
  }

  getFlight(flightId: number) {
    this.flightService.getFlightById(flightId).subscribe({
      next: (data) => {
        if (data) {
          this.flight = data
          this.getDepartureDate()
          this.getDepartureTime()
          this.getDestinationTime()
          this.departure = data.departure
          this.destination = data.destination
        }
      }
    })
  }

  createForm() {
    this.seatsForm = this.formBuilder.group({
      flightId: [this.flightId],
      place: [''],
      legSpace: [''],
      seatClass: [''],
      nextToExit: [false]
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
        },
        error: (err) => {
          console.error("Error fetching seats", err)
        }
      })
    }
  }

  assignSelectedPassenger(passenger: number) {
    this.selectedPassenger = passenger
  }

  assignSelectedSeats() {
    let count = 0
    for (let j = 0; j < this.seats.length; j++) {
      let seat: Seat = this.seats[j]
      if (seat.isAvailable) {
        this.selectedSeats.push({ seat: seat, passengerIndex: count + 1 });
        count++
      }
      if (count >= this.numberOfPeople) {
        return
      }
    }
  }

  seatIsSelected(seat: Seat) {
    for (let selected of this.selectedSeats) {
      if (seat.number === selected.seat.number) {
        return true
      }
    }
    return false
  }

  onSeatClick(seat: Seat) {
    if (!this.seatIsSelected(seat)) {
      this.selectedSeats[this.selectedPassenger - 1] = { seat: seat, passengerIndex: this.selectedPassenger };
      this.selectedSeatPrice = seat.price;
    }
  }

  checkSeat(seat: Seat) {
    return this.selectedSeats.some(s => s.seat.number == seat.number)
  }

  getSeats(flightId: number) {
    this.seatService.getSeatsByFlightId(flightId).subscribe({
      next: (data) => {
        this.seats = data
        this.assignSeatsToCategories();
        this.assignSelectedSeats()
      }
    })
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

  calculateTotal() {
    let result: number = 0
    for (let selected of this.selectedSeats) {
      result += selected.seat.price
    }
    return result.toFixed(2)
  }

  getSeatText(seat: Seat) {
    for (let selected of this.selectedSeats) {
      if (seat == selected.seat) {
        return `P${selected.passengerIndex}`
      }
    }
    return seat.number
  }

  getDepartureDate() {
    this.departureDate = this.flightService.getDepartureDate(this.flight)
  }

  getDepartureTime() {
    this.departureTime = this.flightService.getDepartureTime(this.flight)
  }

  getDestinationTime() {
    this.destinationTime = this.flightService.getDestinationTime(this.flight)
  }

  onBook() {
    for (let selected of this.selectedSeats) {
      const seat = selected.seat
      seat.clientId = this.authService.getClientInfo()['id']
      seat.isAvailable = false
      this.seatService.updateSeat(seat).subscribe({
        next: (data) => {
          console.log("Seat updated!", data)
        }, error: (err) => {
          console.error("Error updating seat!", err)
        }
      })
    }
    this.router.navigate(['/success'])
  }
}
