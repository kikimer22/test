import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { MobileService } from '../../../../shared/services/mobile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit {

  // public isMobile: Observable<boolean> = this.mobileService.mobile;
  // public isMenuOpen = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    private mobileService: MobileService,
  ) {
  }

  ngOnInit() {
  }

}
