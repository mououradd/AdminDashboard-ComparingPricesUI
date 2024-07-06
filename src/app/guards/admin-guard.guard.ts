import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return adminGuardFn(this.authService, this.router);
  }
}

export function adminGuardFn(authService: AuthService, router: Router): boolean {
  const user = authService.GetUserData();
  if (user && user.roles && (user.roles.includes('Admin')|| user.roles.includes('SuperAdmin'))) {
    return true;
  }

  router.navigate(['/notfound']);
  return false;
}
