import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaquinasCreateComponent } from './maquinas-create/maquinas-create.component';
import { MaquinasListComponent } from './maquinas-list/maquinas-list.component';
import { MaquinasEditarComponent } from './maquinas-editar/maquinas-editar.component';
import { MaquinasEliminarComponent } from './maquinas-eliminar/maquinas-eliminar.component';
import { MaquinasRoutingModule } from './maquinas-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    MaquinasCreateComponent,
    MaquinasListComponent,
    MaquinasEditarComponent,
    MaquinasEliminarComponent
  ],
  imports: [
    CommonModule,
    MaquinasRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ]
})
export class MaquinasModule { }
