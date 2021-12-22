import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnteredUserData } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public message: string;

  public isRecovery: boolean;
  public recoveryEmail: string;

  constructor(
    public auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  public signInEmail() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: EnteredUserData = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.signInEmail(user.email, user.password).then(() => {
      this.form.reset();
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });

  }

  public signInGoogle() {
    // this.auth.signInGoogle().then();
  }

  public toggleRecoveryView() {
    this.isRecovery = !this.isRecovery;
  }

  public recoverPassword() {
    // this.auth.recoverPassword(this.recoveryEmail);
  }

  public signOut() {
    // this.auth.signOut().then();
  }

  public emitHandler(data: EnteredUserData) {

  }

}

