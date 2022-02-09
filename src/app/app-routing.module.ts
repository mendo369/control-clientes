import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TableroComponent } from './components/tablero/tablero.component';

const routes: Routes = [
  { path: '', component: TableroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'cliente/editar/:id', component: EditarClienteComponent },
  { path: '**', component: NoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
