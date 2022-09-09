import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User.interface";
import {AuthenticatedUser} from "../service/auth/AuthenticatedUser.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private http: HttpClient, private AuthenticatedUser: AuthenticatedUser) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(next.data!.expectedRole);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(route.data!.expectedRole);
  }

  checkAuthentication(role: string): Observable<boolean> {
    let user: User | null = this.AuthenticatedUser.getAuthenticatedUser();
    if (user != null)
      if (user.role == role)
        return of(true);
    return of(false);
  }
}
