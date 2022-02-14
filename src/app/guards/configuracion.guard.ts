import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracionService } from '../services/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGuard implements CanActivate {

  constructor(
    private router: Router,
    private confService: ConfiguracionService
  ) { }

  canActivate(): Observable<boolean> {
    return this.confService.getConfiguracion().pipe(
      map(
        configuracion => {
          if (configuracion.permitirRegistro) {
            return true;
          }
          else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      )
    )
  }



}
