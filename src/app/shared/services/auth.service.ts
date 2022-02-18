import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider, getAuth, linkWithPopup } from 'firebase/auth';

import User = firebase.User;

import UserCredential = firebase.auth.UserCredential;
import AuthProvider = firebase.auth.AuthProvider;
import AuthCredential = firebase.auth.AuthCredential;
import { FbAuthResponse } from '../interfaces';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NestBeService } from './nest-be.service';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';

export interface UserBE {
  email: string;
  uid: string;
}

export interface UserFromBE {
  email: string;
  uid: string;
  id: number;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public idToken: string = null;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private fireAuth: AngularFireAuth,
    private nestBeService: NestBeService
  ) {

    this.fireAuth.authState.pipe(
      mergeMap((userData: User | null) => {
        if (!userData) {
          localStorage.removeItem('user');
          this.user$.next(null);
          this.idToken = '';
          return of('');
        }
        localStorage.setItem('user', JSON.stringify(userData));
        this.user$.next(userData);
        return from(userData.getIdToken()).pipe(
          mergeMap((idToken: string) => {
            this.idToken = idToken;
            console.log(idToken);
            return this.nestBeService.getUserByUid(userData.uid, this.idToken).pipe(
              map((userFromBE: UserFromBE) => {
                if (!userFromBE) {
                  this.nestBeService.saveUserInBE({email: userData.email, uid: userData.uid}, idToken);
                }
                return userData;
              })
            );
          })
        );
      })
    ).subscribe((userData: User) => {
      console.log('userData', userData);
    });

  }

  public async signInGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    await this.fireAuth.signInWithPopup(provider);
  }

  public async signUpEmail(email: string, password: string): Promise<void> {
    let error: any;
    let response: UserCredential;

    try {
      response = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      error = err;
    }

    if (error) {
      console.log(error);
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

  public async signInEmail(email: string, password: string, cred?: AuthCredential): Promise<UserCredential> {
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

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user;
  }

}
