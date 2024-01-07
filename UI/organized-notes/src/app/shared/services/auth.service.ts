import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AuthUser } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = 'http://localhost:5000/api/auth/';

  currentUserSignal = signal<AuthUser | null>(null);
  errorMessageSignal = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  register(userData: User) {
    this.http.post<AuthUser>(this.apiUrl + 'registerUser', userData).subscribe((response) => {
      this.currentUserSignal.set(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('id', response.id);
      this.router.navigate(['/']);
      this.errorMessageSignal.set(null);
    },
    (error) => {
      if (error.status === 409) {
       this.errorMessageSignal.set(error.error);
      }
    })
  }

  login(userData: {username: string, password: string}) {
    this.http.post<AuthUser>(this.apiUrl + 'loginUser', userData).subscribe((response) => {
      this.currentUserSignal.set(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('id', response.id);
      this.router.navigate(['/']);
      this.errorMessageSignal.set(null);
    },
    (error) => {
      if (error.status === 401 || error.status===404) {
        this.errorMessageSignal.set(error.error);
      }
    })
  }

  logout(){
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.currentUserSignal.set(null);
    this.router.navigate(['/register']);
  }

  getUser(){
    if(localStorage.getItem('token')){
      const data = {
        token:localStorage.getItem('token')
      }
      this.http.post<AuthUser>(this.apiUrl + 'getUser', data).subscribe((response) => {
        this.currentUserSignal.set(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      })
    }
  }
}
