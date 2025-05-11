import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private redirectUrl: string = '';
  private http = inject(HttpClient);

 private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  currentUserName$ = this.currentUserNameSubject.asObservable();

   getInitialLoginStatus(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  login(user: User) {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('username', user.userName);
    this.isLoggedInSubject.next(true);
    this.currentUserNameSubject.next(user.userName);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
    this.currentUserNameSubject.next(null);
    this.redirectUrl = '';
  }

  registerUser(user: User): Observable<User> {
    user.password = window.btoa(user.password);
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  isUserEmailExists(email: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`);
  }

  isUserExists(email: string, password: string): Observable<User[]> {
    password = window.btoa(password);
    return this.http.get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`);
  }

  setredirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getredirectUrl() {
    return this.redirectUrl;
  }
}
