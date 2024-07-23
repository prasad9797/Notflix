import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private newUser: User = {
    username: '',
    password: '',
    email: '',
    role: 'USER',
  };

  setEmailPassword(data: { email: string; password: string }) {
    this.newUser.email = data.email;
    this.newUser.password = data.password;
  }

  setUsernameTmdbKey(data: { username: string; tmdb_key: string }) {
    this.newUser.username = data.username;
    this.newUser.role = 'USER';
  }

  getNewUser(): User {
    return this.newUser;
  }

  clearData(): void {
    this.newUser = {
      username: '',
      password: '',
      email: '',
      role: 'USER',
    };
  }
}
