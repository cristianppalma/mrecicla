import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorCreateComponent } from './proveedor-create/proveedor-create.component';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorDetailsComponent } from './proveedor-details/proveedor-details.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';




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
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ]
})
export class ProveedorModule { }
