import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesEditComponent } from './solicitudes-edit/solicitudes-edit.component';
import { SolicitudesCrearComponent } from './solicitudes-crear/solicitudes-crear.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { SolicitudesControlComponent } from './solicitudes-control/solicitudes-control.component';
import { MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    SolicitudesControlComponent,
    SolicitudesCrearComponent,
    SolicitudesEditComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule
  ]
})
export class SolicitudesModule { }
