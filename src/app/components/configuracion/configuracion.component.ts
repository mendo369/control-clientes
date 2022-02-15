import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/models/configuracion.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro: boolean;

  constructor(
    private router: Router,
    private confService: ConfiguracionService
  ) { }

  ngOnInit(): void {
    this.confService.getConfiguracion().subscribe(
      (conf: Configuracion) => {
        this.permitirRegistro = conf.permitirRegistro;
      }
    )
  }

  guardar() {
    let configuracion = { permitirRegistro: this.permitirRegistro };
    this.confService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
