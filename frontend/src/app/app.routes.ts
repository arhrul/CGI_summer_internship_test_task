import { Routes } from '@angular/router';
import {HomepageComponent} from './views/homepage/homepage.component';
import {AdminComponent} from './views/admin/admin.component';
import {SeatsComponent} from './views/seats/seats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'seats/:id', component: SeatsComponent },

  { path: '**', redirectTo: 'homepage' },
];
