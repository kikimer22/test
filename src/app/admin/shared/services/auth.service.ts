import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export enum AuthTypes {
  SignUpEmail = 'signUpEmail',
  SignInEmail = 'signInEmail',
  GoogleAuth = 'googleAuth',
}

// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signOut,
//   signInWithPopup,
//   GoogleAuthProvider,
//   UserCredential,
//   AuthCredential,
//   AuthProvider,
//   User,
//   sendPasswordResetEmail,
//   linkWithCredential,
//   fetchSignInMethodsForEmail
// } from 'firebase/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;

@Injectable({providedIn: 'root'})
export class AuthService {

  public user$: BehaviorSubject<any> = new BehaviorSubject(null);

  public subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
  ) {
  }

  public async signUpEmail(email: string, password: string): Promise<void> {

    try {
      const userCredential: UserCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      this.handleLogin(userCredential.user);
    } catch (error) {
      console.log(error);
    }

  }

  public async signInEmail(email: string, password: string): Promise<void> {

    try {
      const userCredential: UserCredential = await this.fireAuth.signInWithEmailAndPassword(email, password);
      this.handleLogin(userCredential.user);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        console.log('wrong-password');
      } else {
        console.log(error);
      }
    }

  }

  // public async signInGoogle(): Promise<void> {
  //   const response: UserCredential = await this.signInGoogleWeb();
  //   console.log('response signInGoogle', response);
  //   this.handleLogin(response.user);
  // }
  //
  // public async recoverPassword(email: string): Promise<any> {
  //   const auth = getAuth();
  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       console.log('Password reset email sent. Please check email.');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  //
  // public async signOut(): Promise<void> {
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log(error);
  //     });
  // }
  //
  // private async signInEmail(email: string, password: string, cred?: AuthCredential): Promise<UserCredential> {
  //   try {
  //     const auth = getAuth();
  //     const response: UserCredential = await signInWithEmailAndPassword(auth, email, password);
  //
  //     if (cred) {
  //       linkWithCredential(auth.currentUser, cred)
  //         .then((userCredential: UserCredential) => {
  //           console.log('Account linking success', userCredential.user);
  //         }).catch((error) => {
  //         console.log('Account linking error', error);
  //       });
  //     }
  //
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
  //
  // private async signInGoogleWeb(): Promise<UserCredential> {
  //   const provider = new GoogleAuthProvider();
  //   return await this.signInWebWithProvider(provider);
  // }
  //
  // // tslint:disable-next-line:max-line-length
  // private async signInWebWithProvider(provider: AuthProvider, cred?: AuthCredential): Promise<UserCredential | any> {
  //   try {
  //     const auth = getAuth();
  //     const response = signInWithPopup(auth, provider);
  //
  //     if (cred) {
  //       linkWithCredential(auth.currentUser, cred)
  //         .then((userCredential: UserCredential) => {
  //           console.log('Account linking success', userCredential.user);
  //         }).catch((error) => {
  //         console.log('Account linking error', error);
  //       });
  //     }
  //
  //     return response;
  //   } catch (error) {
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       const pendingCred: AuthCredential = error.credential;
  //       const email: string = error.email;
  //
  //       const auth = getAuth();
  //       const [method] = await fetchSignInMethodsForEmail(auth, email);
  //       if (method === 'password') {
  //         const password = prompt(`An account already exists with the same email address ${email} but different sign-in credentials. Enter password.`);
  //         if (password) {
  //           return this.signInEmail(email, password, pendingCred);
  //         }
  //       } else {
  //         let newProvider: AuthProvider;
  //         if (method === 'google.com') {
  //           newProvider = new GoogleAuthProvider();
  //         }
  //         return await this.signInWebWithProvider(newProvider, pendingCred);
  //       }
  //     }
  //   }
  // }

  private async handleLogin(user: User) {
    console.log('user', user);
    this.user$.next(user);
    // this.router.navigate(['/']);
  }

}
