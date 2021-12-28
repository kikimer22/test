import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EnteredUserData } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit, OnDestroy {

  public selectedTabIndex = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getUser() {
    const subscription = this.auth.user$.subscribe((user) => {
      console.log(user);
    });
    this.subscriptions.add(subscription);
  }

  public signInEmail(data: EnteredUserData) {
    this.auth.signInUpEmail(data.email, data.password).then(() => {
      this.router.navigate(['/']);
    }).catch(() => {
      this.selectedTabIndex = 3;
      this.cdr.detectChanges();
    });
  }

  public signUpEmail(data: EnteredUserData) {
    this.auth.signInUpEmail(data.email, data.password).then(() => {
      this.router.navigate(['/']);
    }).catch(() => {
      this.selectedTabIndex = 3;
      this.cdr.detectChanges();
    });
  }

  public signInGoogle() {
    this.auth.signInGoogle().then(() => {
      this.router.navigate(['/']);
    });
  }

  public recoverPassword(email: string) {
    this.auth.recoverPassword(email).then(() => {
      this.selectedTabIndex = 1;
      this.cdr.detectChanges();
    }).catch(() => {
    });
  }

  public signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['admin', 'auth']);
    });
  }

}

