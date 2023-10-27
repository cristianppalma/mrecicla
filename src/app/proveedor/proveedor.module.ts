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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    ProveedorCreateComponent,
    ProveedorListComponent,
    ProveedorDetailsComponent,
    ProveedorEditComponent,
    ModalDeleteComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class ProveedorModule { }
