import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MobileService } from '../../../../shared/services/mobile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public isMobile: Observable<boolean> = this.mobileService.mobile;

  public isMenuOpen = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    private mobileService: MobileService,
  ) {
  }

  ngOnInit() {
  }

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  public logout(event: Event) {
    event.preventDefault();
    // this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }

}
