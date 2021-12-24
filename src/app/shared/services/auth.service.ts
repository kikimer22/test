import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;
import { EnteredUserData } from '../interfaces';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({providedIn: 'root'})
export class AuthService {

  public user$: BehaviorSubject<any> = new BehaviorSubject(null);
  public subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
  ) {
  }

  public async signUpEmail(data: EnteredUserData): Promise<void> {

    try {
      const userCredential: UserCredential = await this.fireAuth.createUserWithEmailAndPassword(data.email, data.password);
      this.handleLogin(userCredential.user);
      this.redirectAfterAuth();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('email-already-exist run signInEmail');
        this.signInEmail(data);
      } else {
        console.log(error);
      }
    }

  }

  public async signInEmail(data: EnteredUserData): Promise<void> {

    try {
      const userCredential: UserCredential = await this.fireAuth.signInWithEmailAndPassword(data.email, data.password);
      this.handleLogin(userCredential.user);
      this.redirectAfterAuth();
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        console.log('wrong-password');
      } else if (error.code === 'auth/user-not-found') {
        this.signUpEmail(data);
      } else {
        console.log(error);
      }
    }

  }

  public async signInGoogle(): Promise<void> {

    try {
      const provider = new GoogleAuthProvider();
      const userCredential: UserCredential = await this.fireAuth.signInWithPopup(provider);
      this.handleLogin(userCredential.user);
      this.redirectAfterAuth();
    } catch (error) {
      console.log(error);
    }

  }

  public async recoverPassword(email: string): Promise<void> {

    try {
      this.fireAuth.sendPasswordResetEmail(email).then(() => {
      });
    } catch (error) {
      console.log(error);
    }

  }

  public async signOut(): Promise<void> {

    try {
      this.fireAuth.signOut().then(() => {
        this.handleLogin(null);
        this.router.navigate(['admin', 'auth']);
      });
    } catch (error) {
      console.log(error);
    }

  }

  private redirectAfterAuth() {
    this.router.navigate(['/']);
  }

  private async handleLogin(user: User) {
    this.user$.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.setItem('user', null);
    }
  }

}
