import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = localStorage.getItem('token')
  if (isLoggedIn) {
    return true;
  }else{
    authService.setredirectUrl(state.url);
    return router.createUrlTree(['/sign-in']);
  }
};
