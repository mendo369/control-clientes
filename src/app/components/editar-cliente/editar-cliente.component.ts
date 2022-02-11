import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id: string;

  constructor(private clienteService: ClienteService,
    private falshMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];//se obtiene el parametro equivalente al id que está en la url gracias al route
    this.clienteService.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    })
  }

  guardar(f: NgForm) {
    if (!f.valid) {
      this.falshMessages.show('Por favor llena el formulario correctamente', { cssClass: 'alert-danger', timeout: 4000 });
    }
    else {
      f.value.id = this.id;
      this.clienteService.modificarCliente(f.value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('¿Seguro que desea eliminar el cliente?')) {
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
