import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ListaDeEmpleadosComponent } from './admin/lista-de-empleados/lista-de-empleados.component';



@NgModule({
  declarations: [
    AdminComponent,
    ListaDeEmpleadosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
