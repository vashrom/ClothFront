import { Injectable } from '@angular/core';
import {Router,CanActivate} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(){
    if(!this.auth.isAdmin() || !this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/')
      return false
    }

    return true
  }
}
