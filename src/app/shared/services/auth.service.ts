import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { GoogleAuthProvider } from 'firebase/auth';

import User = firebase.User;

import UserCredential = firebase.auth.UserCredential;
import AuthProvider = firebase.auth.AuthProvider;
import AuthCredential = firebase.auth.AuthCredential;
import { FbAuthResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public token: string = null;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private fireAuth: AngularFireAuth,
  ) {

    this.fireAuth.authState.subscribe((userData: User | null) => {
      if (userData) {
        userData.getIdToken().then(t => {
          this.token = t;
        });
        localStorage.setItem('user', JSON.stringify(userData));
        this.user$.next(userData);
      } else {
        localStorage.removeItem('user');
        this.user$.next(null);
      }
    });

  }

  public async signInGoogle(): Promise<void> {

    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    await this.fireAuth.signInWithPopup(provider);

    // this.signInWebWithProvider(provider);

  }

  public async signInUpEmail(email: string, password: string): Promise<void> {
    let error: any;
    let response: UserCredential;

    try {
      response = await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      error = err;
    }

    if (error && error.code === 'auth/user-not-found') {
      error = null;
      try {
        response = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      } catch (err) {
        error = err;
      }
    }

    if (error) {
      if (error.code === 'auth/wrong-password') {
        console.log('Please use "Forgot Password"');
      } else {
        console.log(error);
      }
      throw error;
    }

    if (!response) {
      return;
    }

  }

  public async recoverPassword(email: string): Promise<any> {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
      console.log('Password reset email sent. Please check email.', 'Recovery password');
    } catch (error) {
      console.log(error);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.fireAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private async signInEmail(email: string, password: string, cred?: AuthCredential): Promise<UserCredential> {
    try {
      const response = await this.fireAuth.signInWithEmailAndPassword(email, password);

      if (cred) {
        await response.user.linkWithCredential(cred);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // private async signInWebWithProvider(
  //   provider: AuthProvider,
  //   cred?: AuthCredential
  // ): Promise<UserCredential> {
  //
  //   try {
  //     const response: UserCredential = await this.fireAuth.signInWithPopup(provider);
  //
  //     if (cred) {
  //       await response.user.linkWithCredential(cred);
  //     }
  //
  //     return response;
  //   } catch (error) {
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       const pendingCred: AuthCredential = error.credential;
  //       const email: string = error.email;
  //
  //       const [method] = await this.fireAuth.fetchSignInMethodsForEmail(email);
  //       if (method === 'password') {
  //         const password = prompt(`An account already exists with the same email address ${email} but different sign-in credentials. Enter password.`);
  //         if (password) {
  //           return this.signInEmail(email, password, pendingCred);
  //         }
  //       } else {
  //         const newProvider = new GoogleAuthProvider();
  //         // newProvider.addScope('email');
  //         this.signInWebWithProvider(newProvider, pendingCred);
  //       }
  //     }
  //   }
  //
  // }

}
