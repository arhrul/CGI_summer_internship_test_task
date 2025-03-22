import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FlightManagementComponent} from './flight-management/flight-management.component';
import {NgIf} from '@angular/common';
import {SeatManagementComponent} from './seat-management/seat-management.component';
import {ClientManagementComponent} from './client-management/client-management.component';

@Component({
  selector: 'app-admin',
  imports: [
    RouterLink,
    FlightManagementComponent,
    SeatManagementComponent,
    NgIf,
    ClientManagementComponent
  ],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeSection: string = 'flight'
}
