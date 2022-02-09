import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clienteService: ClienteService,
    private falshMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar(f: NgForm) {
    if (!f.valid) {
      this.falshMessages.show('Por favor llene el formulario correctamente', { cssClass: 'alert-danger', timeout: 4000 })
    }
    else {
      this.clienteService.agregarCliente(f.value);
      this.clienteForm.resetForm();
      this.botonCerrar.nativeElement.click();
    }
  }

}
