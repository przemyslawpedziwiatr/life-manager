import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private fireAuth: AngularFireAuth) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fireAuth.authState.pipe(
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
      map(state => {
        return state !== null;
      }),
      tap( isLoggedIn => {
        !isLoggedIn && this.router.navigate(['/login']);
      }),
    );
  }

}
