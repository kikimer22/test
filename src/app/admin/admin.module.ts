import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AuthGuard } from './shared/services/auth.guard';

import { SearchPipe } from './shared/search.pipe';

import { AlertService } from './shared/services/alert.service';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService]
})
export class AdminModule {

}
