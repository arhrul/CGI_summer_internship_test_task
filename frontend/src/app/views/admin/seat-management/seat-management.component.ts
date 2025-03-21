import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Seat} from '../../../core/model/Seat';
import {SeatService} from '../../../core/services/seatService/seat.service';
import {NgForOf} from '@angular/common';
import {SeatPlace} from '../../../core/enums/SeatPlace';
import {LegSpace} from '../../../core/enums/LegSpace';
import {SeatClass} from '../../../core/enums/SeatClass';

@Component({
  selector: 'app-seat-management',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './seat-management.component.html',
  standalone: true,
  styleUrl: './seat-management.component.css'
})
export class SeatManagementComponent implements OnInit{
  seatForm!: FormGroup
  seats: Seat[] = []

  constructor(private formBuilder: FormBuilder, private seatService: SeatService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.fetchSeats()
  }

  fetchSeats() {
    this.seatService.getSeats().subscribe({
      next: (data) =>
        this.seats = data
    })
  }

  createForm() {
    this.seatForm = this.formBuilder.group({
      flightId: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.seatForm.invalid) {
      return;
    }

    const flightId = this.seatForm.get('flightId')?.value;
    this.seatService.createSeatsForFlight(flightId).subscribe({
      next: (seats) => {
        console.log('Seats created successfully:', seats)
        this.seatForm.reset()
      },
      error: (error) => {
        console.error('Error creating seat:', error);
      }
    })
  }

  deleteSeat(id: number) {
    this.seatService.deleteSeat(id).subscribe({
      next: () => {
        this.seats = this.seats.filter(seat => seat.id !== id)
      }
    })
  }
}
