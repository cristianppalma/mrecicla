import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { UsuarioTableComponent } from './lista-empleados/lista-empleados.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';


const routes: Routes = [
  { path:'listEmp', component: UsuarioTableComponent},
  { path:'addEmp', component: AgregarEmpleadoComponent},
  { path:'edditEmp/:id', component: EditarEmpleadoComponent},
  { path:'adminPrfile', component: PerfilAdminComponent}

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
