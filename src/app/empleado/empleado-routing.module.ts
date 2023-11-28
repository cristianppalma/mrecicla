import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { UsuarioTableComponent } from './lista-empleados/lista-empleados.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { authGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: 'listEmp',
    component: UsuarioTableComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'addEmp',
    component: AgregarEmpleadoComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'edditEmp/:id',
    component: EditarEmpleadoComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'adminProfile/:id',
    component: PerfilAdminComponent,
    // canActivate: [authGuard]
  },
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
