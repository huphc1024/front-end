import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { first } from 'rxjs/operators';
import { ApiService } from 'app/api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser || !currentUser.access_token ) {
        localStorage.removeItem('session');
        localStorage.removeItem('user');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
    return true;
  }

}
