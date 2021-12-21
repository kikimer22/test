import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public message: string;

  public isRecovery: boolean;
  public recoveryEmail: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, введите данные';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заного';
      }
    });

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

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.signInUpEmail(user.email, user.password).then(() => {
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

}

