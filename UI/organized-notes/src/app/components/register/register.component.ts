import { Component } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  loginForm!: FormGroup;
  isLoginForm = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    // Add your registration logic here
    console.log('Registration data:', this.registrationForm.value);
    this.authService.register(this.registrationForm.value);
    this.resetFormData();
  }

  login() {
    // Add your login logic here
    console.log('Login data:', this.loginForm.value);
    this.authService.login(this.loginForm.value);
    this.resetFormData();
    // You can send the login data to your backend server for authentication
  }

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
    this.resetFormData();
  }

  resetFormData() {
    this.registrationForm.reset();
    this.loginForm.reset();
  }
}
