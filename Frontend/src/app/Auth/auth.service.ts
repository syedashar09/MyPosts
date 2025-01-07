import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subject } from 'rxjs';
import { AuthData } from './auth.Model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api/user/';
  private AuthToken: string;
  private IsAuthenticated = false;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.IsAuthenticated;
  }
  getAuthToken() {
    return this.AuthToken;
  }
  getUserId() {
    return this.userId;
  }

  CreateUser(email: string, username: string, password: string) {
    const AuthData: AuthData = {
      email: email,
      username: username,
      password: password,
    };
    this.http.post(this.url + 'signup', AuthData).subscribe(
      (Response) => {
        console.log(Response);
      },
      (error) => {
        this.authStatusListener.next(false);
      },
    );
  }

  logInUser(email: string, password: string) {
    const AuthData: AuthData = {
      email: email,
      password: password,
      username: null,
    };

    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
      }>('http://localhost:3000/api/user/login', AuthData)
      .subscribe((Response) => {
        const token = Response.token;
        const userId = Response.userId;
        this.AuthToken = token;
        this.userId = userId;
        if (Response.token) {
          console.log(Response.token);
          const expiresInDuration = Response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationTime = new Date(
            now.getTime() + expiresInDuration * 1000,
          );
          console.log(expirationTime);
          console.log(expiresInDuration);
          this.saveAuthData(token, expirationTime, userId);
          this.IsAuthenticated = true;
          this.authStatusListener.next(true);
        }
        this.router.navigate(['/']);
      }),
      () => {};
  }

  logOutUser() {
    this.AuthToken = null;
    this.IsAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthInfo();
    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.AuthToken = authInformation.token;
      this.IsAuthenticated = true;
      this.userId = authInformation.userId;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
      console.log(expiresIn);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOutUser();
    }, duration * 1000);
    console.log('Setting timer: ' + duration);
  }

  private saveAuthData(token: string, duration: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', duration.toISOString());
    localStorage.setItem('userId', userId);
  }

  private getAuthInfo() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
}
