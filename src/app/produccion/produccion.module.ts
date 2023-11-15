import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionComponent } from './produccion/produccion.component';
import { ProduccionListComponent } from './produccion-list/produccion-list.component';
import { ProduccionCreateComponent } from './produccion-create/produccion-create.component';
import { ProduccionEditarComponent } from './produccion-editar/produccion-editar.component';
import { ProduccionRoutingModule } from './produccion-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule, matDatepickerAnimations } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';


import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';

import { MatSidenavModule } from '@angular/material/sidenav';


import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProduccionComponent,
    ProduccionListComponent,
    ProduccionCreateComponent,
    ProduccionEditarComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSidenavModule,


    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class ProduccionModule { }
