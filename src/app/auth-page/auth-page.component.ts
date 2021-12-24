import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { EnteredUserData } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
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
    this.auth.signInEmail(data);
  }

  public signUpEmail(data: EnteredUserData) {
    this.auth.signUpEmail(data);
  }

  public signInGoogle() {
    this.auth.signInGoogle().then();
  }

  public recoverPassword(email: string) {
    this.auth.recoverPassword(email);
  }

  public signOut() {
    // this.auth.signOut().then();
  }

  public emitHandler(data: EnteredUserData) {
    console.log(data);
  }

}

