import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorCreateComponent } from './proveedor-create/proveedor-create.component';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorDetailsComponent } from './proveedor-details/proveedor-details.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';



@NgModule({
  declarations: [
    ProveedorCreateComponent,
    ProveedorListComponent,
    ProveedorDetailsComponent,
    ProveedorEditComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    
  ]
})
export class ProveedorModule { }
