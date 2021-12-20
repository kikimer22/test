import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from '../../../shared/interfaces';
import { BehaviorSubject, Observable, Subject, Subscription, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';

@Injectable({providedIn: 'root'})
export class AuthService {

  // public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public user$: BehaviorSubject<any> = new BehaviorSubject(null);
  public error$: Subject<string> = new Subject<string>();

  public subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private fireAuth: AngularFireAuth,
  ) {
    this.user$.subscribe(user => {
      console.log('user', user);
    });

    // this.fireAuth.authState.subscribe((userData) => {
    //   if (userData) {
    //     localStorage.setItem('user', JSON.stringify(userData));
    //     this.user$.next(userData);
    //   } else {
    //     localStorage.removeItem('user');
    //     this.user$.next(null);
    //   }
    // });
  }

  public async signInUpEmail(email: string, password: string): Promise<void> {
    let error: any;
    let response: firebase.auth.UserCredential;

    try {
      response = await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      error = err;
    }

    if (error && error.code === 'auth/user-not-found') {
      error = null;
      try {
        response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (err) {
        error = err;
      }
    }

    if (error) {
      console.log(error.message || error.errorMessage);
    }

    if (!response) {
      return;
    }

    const method = response.credential?.signInMethod || response.additionalUserInfo.providerId;

    console.log(method);
    console.log(response);

    await this.handleLogin(email, method);
  }

  private async handleLogin(email: string, method: string): Promise<void> {

    const queryParams: any = {};
    switch (method) {
      case 'google.com':
        queryParams.gl_signup_event = 1;
        break;

      case 'password':
        queryParams.email_signup_event = 1;
        break;
    }

  }

  // get token(): string {
  //   const expDate = new Date(localStorage.getItem('fb-token-exp'));
  //   if (new Date() > expDate) {
  //     this.logout();
  //     return null;
  //   }
  //   return localStorage.getItem('fb-token');
  // }

  // loginByEmail(user: User): Observable<any> {
  //   user.returnSecureToken = true;
  //   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, user)
  //     .pipe(
  //       tap(this.setToken),
  //       catchError(this.handleError.bind(this))
  //     );
  // }

  // logout() {
  //   this.setToken(null);
  // }

  // isAuthenticated(): boolean {
  //   return !!this.token;
  // }

  // private handleError(error: HttpErrorResponse) {
  //   const {message} = error.error.error;
  //
  //   switch (message) {
  //     case 'INVALID_EMAIL':
  //       this.error$.next('Неверный email');
  //       break;
  //     case 'INVALID_PASSWORD':
  //       this.error$.next('Неверный пароль');
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       this.error$.next('Такого email нет');
  //       break;
  //   }
  //
  //   return throwError(error);
  // }

  // private setToken(response: FbAuthResponse | null) {
  //   console.log(response);
  //   if (response) {
  //     const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
  //     localStorage.setItem('fb-token', response.idToken);
  //     localStorage.setItem('fb-token-exp', expDate.toString());
  //   } else {
  //     localStorage.clear();
  //   }
  // }

}
