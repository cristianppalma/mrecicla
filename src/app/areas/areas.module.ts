import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasCreateComponent } from './areas-create/areas-create.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AreasEditComponent } from './areas-edit/areas-edit.component';
import { AreasRoutingModule } from './areas-routing.module';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AreasCreateComponent,
    AreasListComponent,
    AreasEditComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class AreasModule { }
