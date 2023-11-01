import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioTableComponent } from './lista-empleados/lista-empleados.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { AvisoDialogComponent } from './aviso-dialog/aviso-dialog.component';

@NgModule({
  declarations: [
    UsuarioTableComponent,
    AvisoDialogComponent,
    EditarEmpleadoComponent,
    AgregarEmpleadoComponent,
    PerfilAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
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
