import { Component } from '@angular/core';
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
    this.authService.register(this.registrationForm.value);
    this.resetFormData();
  }

  login() {
    this.authService.login(this.loginForm.value);
    this.resetFormData();
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
