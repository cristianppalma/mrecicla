import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {MatTableModule} from '@angular/material/table';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';


@NgModule({
  declarations: [
    ListaEmpleadosComponent,
    EditarEmpleadoComponent,
    AgregarEmpleadoComponent,
    PerfilAdminComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    EmpleadoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class EmpleadoModule { }
