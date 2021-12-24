import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { MaterialModule } from './material.module';

import { EmailPasswordFormComponent } from './components/email-password-form/email-password-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailFormComponent } from './components/email-form/email-form.component';

@NgModule({
  declarations: [
    EmailPasswordFormComponent,
    EmailFormComponent,
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EmailPasswordFormComponent,
    EmailFormComponent,
  ]
})
export class SharedModule {

}
