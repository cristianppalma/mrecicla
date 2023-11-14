import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduccionEmpleadoCreateComponent } from './produccion-empleado-create/produccion-empleado-create.component';

const routes: Routes = [
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
