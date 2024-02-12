import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

// export function AuthGuardFactory(authService: AuthService) {
//   return () => authService.isLoggedIn;
// }

// export const AuthGuard: CanActivateFn = (route, state) => {
//   console.log('Le guard a été activé');
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(): boolean {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}


