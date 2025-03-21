import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ImageService} from '../../core/services/imageService/image.service';
import {LinkService} from '../../core/services/linkService/link.service';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ClientService} from '../../core/services/clientService/client.service';
import {Client} from '../../core/model/Client';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgStyle,
    RouterLink
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  backgroundImage: string

  registerLink: string
  public showPassword: boolean = false;
  clientForm!: FormGroup
  formSubmitted: boolean = false;

  constructor(private readonly imageService: ImageService,
              private readonly linkService: LinkService,
              private readonly authService: AuthenticationService,
              private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly clientService: ClientService) {
    this.backgroundImage = imageService.bgPic
    this.registerLink = linkService.registerLink

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.clientForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.clientForm.invalid) {
      return;
    }

    const newLogin: Client = this.clientForm.value;
    this.clientService.loginClient(newLogin).subscribe({
      next: (client) => {
        console.log('Client logged in successfully:', client);
        this.clientService.loginClient(newLogin).subscribe({
          next: (token) => {
            this.authService.login(token, client);
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            console.error('Error during login:', error);
          }
        });
        this.clientForm.reset();
        this.formSubmitted = false;
      },
      error: (error) => {
        console.error('Error logging in client:', error);
        alert(error.error.message);

      }
    });
  }
}
