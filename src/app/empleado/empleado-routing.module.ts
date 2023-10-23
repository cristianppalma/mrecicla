import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path:'listEmp', component: ListaEmpleadosComponent},
  { path:'addEmp', component: AgregarEmpleadoComponent},
  { path:'edditEmp', component: EditarEmpleadoComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]

})
export class EmpleadoRoutingModule { }
