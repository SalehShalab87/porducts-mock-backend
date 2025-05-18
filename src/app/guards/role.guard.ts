import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = ( 
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = localStorage.getItem('token')
  const isAdmin = authService.isAdminSubject?.getValue();
  if (isLoggedIn && isAdmin) {
    return true;
  }else{
    authService.setredirectUrl(state.url);
    return router.createUrlTree(['/sign-in']);
  }
  
};
