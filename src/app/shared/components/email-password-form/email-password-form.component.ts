import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnteredUserData } from '../../interfaces';

@Component({
  selector: 'app-email-password-form',
  templateUrl: './email-password-form.component.html',
  styleUrls: ['./email-password-form.component.scss']
})
export class EmailPasswordFormComponent implements OnInit {

  @Output() emittedValue: EventEmitter<EnteredUserData> = new EventEmitter<EnteredUserData>();

  public form: FormGroup;
  public email = new FormControl(null, [
    Validators.required,
    Validators.email
  ]);
  public password = new FormControl(null, [
    Validators.required,
    Validators.minLength(6)
  ]);

  public passwordVisibility = false;
  public submitted = false;

  constructor(
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: EnteredUserData = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.emittedValue.emit(user);

  }

}
