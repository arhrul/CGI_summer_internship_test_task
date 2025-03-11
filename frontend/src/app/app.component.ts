import { Component } from '@angular/core';
import {HomepageComponent} from './views/homepage/homepage.component';

@Component({
  selector: 'app-root',
  imports: [HomepageComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
