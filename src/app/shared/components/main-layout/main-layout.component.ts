import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../admin/shared/services/auth.service';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

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
