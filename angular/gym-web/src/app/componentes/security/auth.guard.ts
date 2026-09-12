import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

        constructor(private router : Router, private authService: AuthService){}

        canActivate(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<boolean> {
            const usuario = this.authService.getUsuarioActual();
            if (usuario) {
                return of(true);
            } else {
                this.router.navigate(['/login']);
                return of(false);
            }
        }
 
}