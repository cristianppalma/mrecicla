import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorCreateComponent } from './proveedor-create/proveedor-create.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';
import { ProveedorDetailsComponent } from './proveedor-details/proveedor-details.component';

const routes: Routes = [
  { path:'proveedores', component: ProveedorListComponent},
  { path:'proveedorCreate', component: ProveedorCreateComponent},
  { path:'proveedorEdit/:id', component: ProveedorEditComponent},
  { path:'proveedorDetails/:id', component: ProveedorDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
