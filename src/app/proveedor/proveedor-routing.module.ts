import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorCreateComponent } from './proveedor-create/proveedor-create.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';
import { ProveedorDetailsComponent } from './proveedor-details/proveedor-details.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'proveedores',
    component: ProveedorListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'proveedorCreate',
    component: ProveedorCreateComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'proveedorEdit/:id',
    component: ProveedorEditComponent,
    // canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
