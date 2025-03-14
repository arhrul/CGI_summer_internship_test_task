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
      number: ['', [Validators.required]],
      place: ['', [Validators.required]],
      legSpace: ['', [Validators.required]],
      seatClass: ['', [Validators.required]],
      flightId: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.seatForm.invalid) {
      return;
    }

    const newSeat = this.seatForm.value
    this.seatService.createSeat(newSeat).subscribe({
      next: (seat) => {
        console.log('Seat created successfully:', seat)
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

  getSeatPlaceValues() {
    return Object.values(SeatPlace);
  }

  getLegSpaceValues() {
    return Object.values(LegSpace)
  }

  getSeatClassValues() {
    return Object.values(SeatClass)
  }
}
