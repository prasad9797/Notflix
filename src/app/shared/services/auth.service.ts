import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:5566/api/v1/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<any>(`${this.apiURL}/signin`, { email, password })
      .pipe(tap((response) => this.setSession(response)));
  }

  signup(
    email: string,
    password: string,
    username: string,
    role: string
  ): Observable<string> {
    return this.http
      .post<any>(`${this.apiURL}/signup`, { email, password, username, role })
      .pipe(tap((res) => this.setSession(res)));
  }

  setSession(authResult: any) {
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('role', authResult.role);
  }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiURL}/check-email`, { email });
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  }
}
