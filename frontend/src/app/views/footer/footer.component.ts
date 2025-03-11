import { Component } from '@angular/core';
import {ImageService} from '../../core/services/imageService/image.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footerLogo: string
  socialMedia: string
  constructor(private imageService: ImageService) {
    this.footerLogo = imageService.footerLogo
    this.socialMedia = imageService.socialMedia
  }

}
