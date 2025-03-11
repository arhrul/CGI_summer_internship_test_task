import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public logo: string = 'logo.svg';
  public bgPic: string = 'bg_pic.png';
  public footerLogo: string = 'footer_logo.svg'
  public socialMedia: string = 'social_media.svg'
  constructor() { }
}
