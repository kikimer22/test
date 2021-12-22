import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MaterialModule
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    MaterialModule
  ]
})
export class SharedModule {

}
