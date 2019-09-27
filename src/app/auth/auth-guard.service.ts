import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { StudentService } from '../services/student.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private route: Router
    , private service: StudentService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot
    , state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.service.isLoggedin()) { return true }
      // tslint:disable-next-line: one-line
      else this.route.navigate(['login'])
        // TODOs
        return false
    }
}
