import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isUserLogged()) {
      return true;
    }

    // Rediriger vers la page de connexion en conservant l'URL de destination
    this.router.navigate(['/connexion'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
} 