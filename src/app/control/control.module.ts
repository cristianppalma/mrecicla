import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlGastosComponent } from './control-gastos/control-gastos.component';
import { ControlGastosGeneralesComponent } from './control-gastos-generales/control-gastos-generales.component';
import { ControlGastosGeneralesEditarComponent } from './control-gastos-generales-editar/control-gastos-generales-editar.component';
import { ControlRoutingModule } from './control-routing.module';
import { ControlGastosGeneralesCrearComponent } from './control-gastos-generales-crear/control-gastos-generales-crear.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
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


@NgModule({
  declarations: [
    ControlGastosComponent,
    ControlGastosGeneralesComponent,
    ControlGastosGeneralesCrearComponent,
    ControlGastosGeneralesEditarComponent,
    
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
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
  ]
})

export class ControlModule { }
