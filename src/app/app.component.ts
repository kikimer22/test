import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { MobileService } from './shared/services/mobile.service';
import firebase from 'firebase/compat';
import User = firebase.User;
import { idToken } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isMobile: Observable<boolean> = this.mobileService.mobile;
  private subscriptions: Subscription = new Subscription();
  public isMenuOpen = false;
  public user: User;

  constructor(
    private router: Router,
    public auth: AuthService,
    private mobileService: MobileService,
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getUser() {
    const subscription = this.auth.user$.subscribe((user: User) => {
      this.user = user;
    });
    this.subscriptions.add(subscription);
  }

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  public signOut(event: Event) {
    event.preventDefault();
    this.auth.signOut();
    this.router.navigate(['/']);
  }

}
