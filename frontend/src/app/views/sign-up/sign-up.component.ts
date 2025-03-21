import {Component, OnInit} from '@angular/core';
import {Client} from '../../core/model/Client';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ImageService} from '../../core/services/imageService/image.service';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ClientService} from '../../core/services/clientService/client.service';
import {NgIf, NgStyle} from '@angular/common';
import {LinkService} from '../../core/services/linkService/link.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    NgStyle,
    NgIf,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  standalone: true,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  backgroundImage: string
  loginLink: string
  clientForm!: FormGroup
  formSubmitted: boolean = false;

  constructor(private readonly imageService: ImageService,
              private readonly authService: AuthenticationService,
              private readonly linkService: LinkService,
              private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly clientService: ClientService) {
    this.backgroundImage = imageService.bgPic
    this.loginLink = linkService.loginLink
  }

  ngOnInit(): void {
    this.createForm();
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/profile']);
    }
  }

  createForm() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.clientForm.invalid) {
      return;
    }

    const newClient: Client = this.clientForm.value;
    this.clientService.createClient(newClient).subscribe({
      next: (client) => {
        console.log('Client created successfully:', client);
        this.clientService.loginClient(newClient).subscribe({
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
        console.error('Error creating client:', error);
        alert(error.error.message);
      }
    });
  }

}
