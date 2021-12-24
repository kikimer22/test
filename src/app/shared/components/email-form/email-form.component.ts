import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFormComponent implements OnInit {

  @Input() isSubmitted = false;
  @Output() emittedValue: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup;
  public email = new FormControl(null, [
    Validators.required,
    Validators.email
  ]);

  public submitted = false;

  constructor(
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      email: this.email,
    });
  }

  ngOnInit(): void {
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.emittedValue.emit(this.form.value.email);

  }

}
