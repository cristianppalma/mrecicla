import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduccionEmpleadoCreateComponent } from './produccion-empleado-create/produccion-empleado-create.component';
import { ProduccionEmpleadoListComponent } from './produccion-empleado-list/produccion-empleado-list.component';

const routes: Routes = [
  {
    path: 'produccionEmpleado',
    component:ProduccionEmpleadoListComponent
  },
  {
    path: 'produccionEmpleadoCreate',
    component:ProduccionEmpleadoCreateComponent
  },
 ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProduccionEmpleadoRoutingModule { }
