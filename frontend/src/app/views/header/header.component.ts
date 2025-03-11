import { Component } from '@angular/core';
import {ImageService} from '../../core/services/imageService/image.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logo: string
  constructor(private readonly imageService: ImageService) {
    this.logo = imageService.logo
  }
}
