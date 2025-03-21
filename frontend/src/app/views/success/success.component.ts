import { Component } from '@angular/core';
import {ImageService} from '../../core/services/imageService/image.service';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [
    NgStyle,
    RouterLink
  ],
  templateUrl: './success.component.html',
  standalone: true,
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  backgroundImage: string
  constructor(private readonly imageService: ImageService) {
    this.backgroundImage = imageService.bgPic
  }

}
