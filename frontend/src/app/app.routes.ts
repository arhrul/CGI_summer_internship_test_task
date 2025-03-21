import { Routes } from '@angular/router';
import {HomepageComponent} from './views/homepage/homepage.component';
import {AdminComponent} from './views/admin/admin.component';
import {SeatsComponent} from './views/seats/seats.component';
import {SignUpComponent} from './views/sign-up/sign-up.component';
import {LoginComponent} from './views/login/login.component';
import {SuccessComponent} from './views/success/success.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seats/:flightId/:numberOfPeople', component: SeatsComponent },
  { path: 'success', component: SuccessComponent },

  { path: '**', redirectTo: 'homepage' },
];
