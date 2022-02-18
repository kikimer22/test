import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    if (this.auth.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/admin', 'auth'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }

}
