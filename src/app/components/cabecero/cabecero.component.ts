import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedUser: any;
  permitirRegistro: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private confService: ConfiguracionService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })

    this.confService.getConfiguracion().subscribe(
      configuracion => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
