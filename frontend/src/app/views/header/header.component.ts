import { Component } from '@angular/core';
import {ImageService} from '../../core/services/imageService/image.service';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logo: string
  constructor(private readonly imageService: ImageService, protected authService: AuthenticationService) {
    this.logo = imageService.logo
  }

  logout() {
    this.authService.logout()
  }
}
