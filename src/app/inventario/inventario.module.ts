import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioControlComponent } from './inventario-control/inventario-control.component';
import { InventarioEditComponent } from './inventario-edit/inventario-edit.component';
import { InventarioCrearComponent } from './inventario-crear/inventario-crear.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    InventarioControlComponent,
    InventarioEditComponent,
    InventarioCrearComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule
  ]
})
export class InventarioModule { }
