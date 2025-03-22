import {Component, OnInit} from '@angular/core';
import {Client} from '../../../core/model/Client';
import {ClientService} from '../../../core/services/clientService/client.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-client-management',
  imports: [
    NgForOf
  ],
  templateUrl: './client-management.component.html',
  standalone: true,
  styleUrl: './client-management.component.css'
})
export class ClientManagementComponent implements OnInit {
  clients?: Client[] = []

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.fetchClients()
  }

  fetchClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data
      }
    })
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client)
  }
}
