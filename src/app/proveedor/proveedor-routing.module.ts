import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorCreateComponent } from './proveedor-create/proveedor-create.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';
import { ProveedorDetailsComponent } from './proveedor-details/proveedor-details.component';
import { authGuard } from '../guards/auth.guard';
import { rolesGuard } from '../guards/roles.guard';

const routes: Routes = [
  {
    path: 'proveedores',
    component: ProveedorListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'proveedorCreate',
    component: ProveedorCreateComponent,
    // canActivate: [rolesGuard],
    // data: { puesto: 'Administrador' }
  },
  {
    path: 'proveedorEdit/:id',
    component: ProveedorEditComponent,
    // canActivate: [rolesGuard],
    // data: { puesto: 'Administrador' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
