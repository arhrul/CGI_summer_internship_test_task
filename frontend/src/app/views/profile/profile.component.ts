import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../core/services/clientService/client.service';
import {Router} from '@angular/router';
import {Client} from '../../core/model/Client';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {HeaderComponent} from '../header/header.component';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {ImageService} from '../../core/services/imageService/image.service';
import {FooterComponent} from '../footer/footer.component';
import {SeatService} from '../../core/services/seatService/seat.service';
import {FlightService} from '../../core/services/flightService/flight.service';
import {Seat} from '../../core/model/Seat';
import {Flight} from '../../core/model/Flight';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    NgStyle,
    FooterComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  clientForm!: FormGroup
  clientInfo: Client | null = null;
  isEditing: boolean = false;
  bgPic: string
  clientId!: number;

  seats: Seat[] = []
  flights: Flight[] = []

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private readonly router: Router,
              private  authService: AuthenticationService,
              private imageService: ImageService,
              private seatService: SeatService,
              private flightService: FlightService,) {
    this.bgPic = imageService.bgPic
  }

  ngOnInit(): void {
    this.clientInfo = this.authService.getClientInfo();
    if (!this.clientInfo) {
      this.router.navigate(['/login']);
      return;
    }
    this.createClientForm()
    this.loadClientId();
    this.loadClientInfo();
    this.getSeats()
  }

  getSeats() {
    this.seatService.getSeatsByClientId(this.clientId).subscribe({
      next: (data) => {
        this.seats = data
        this.getFlights()

      }, error: (err) => {
        console.error("Seats not found!", err)
      }
    })

  }

  getFlights() {
    for (let seat of this.seats) {
      this.flightService.getFlightById(seat.flightId).subscribe({
        next: (data) => {
          if (data) {
            this.flights.push(data)
          }
        }, error: (err) => {
          console.error("Flight not found!", err)
        }
      })
    }
    setTimeout(() => {
      this.flights = this.flights.sort((a, b) => {
        const timeA = new Date(a.departureTime).getDate();
        const timeB = new Date(b.departureTime).getDate();
        return timeA - timeB;
      });
    }, 1000);
  }

  createClientForm() {
    if (this.clientInfo) {
      this.clientForm = this.formBuilder.group({
        firstName: [{ value: this.clientInfo.firstName, disabled: !this.isEditing }, [Validators.required]],
        lastName: [{ value: this.clientInfo.lastName, disabled: !this.isEditing }, [Validators.required]],
        email: [{ value: this.clientInfo.email, disabled: !this.isEditing }, [Validators.required, Validators.email]],
      });
    }
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      return;
    }

    const updatedClient: Client = { ...this.clientInfo, ...this.clientForm.value };

    this.clientService.updateClient(updatedClient).subscribe({
      next: (updatedClient) => {
        console.log('Client updated successfully:', updatedClient);
        this.authService.login(JSON.parse(localStorage.getItem('authToken') ?? ''), updatedClient);
        this.isEditing = false;
        this.createClientForm();
      },
      error: (error) => {
        console.error('Error updating client:', error);
      }
    });
  }

  onEditClick() {
    this.isEditing = !this.isEditing;
    this.clientForm.controls['firstName'].enable();
    this.clientForm.controls['lastName'].enable();
    this.clientForm.controls['email'].enable();
    this.clientForm.controls['phone'].enable();
  }

  loadClientInfo(): void {
    if (!this.clientId) {
      console.error('Client ID not found');
      this.router.navigate(['/login']);
      return;
    }

    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.clientInfo = client;
        this.createClientForm()

      },
      error: (err) => {
        console.error('Error fetching client data:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  loadClientId(): void {
    try {
      this.clientId = this.authService.getClientId();
    } catch (error) {
      console.error('Error loading client ID:', error);
    }
  }

  getFlightDate(flight: Flight) {
    return this.flightService.getDepartureDate(flight)
  }

  getFlightTime(flight: Flight) {
    return this.flightService.getDepartureTime(flight)
  }

  getDuration(flight: Flight) {
    return this.flightService.formatDuration(flight.duration)
  }
}
