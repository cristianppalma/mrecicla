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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { InventarioControlSalidaComponent } from './inventario-control-salida/inventario-control-salida.component';
import { InventarioEditSalidaComponent } from './inventario-edit-salida/inventario-edit-salida.component';
import { InventarioSumaComponent } from './inventario-suma/inventario-suma.component';
import { InventarioCatalogoComponent } from './inventario-catalogo/inventario-catalogo.component';
import { InventarioSalidaCatalogoComponent } from './inventario-salida-catalogo/inventario-salida-catalogo.component';
import { InventarioCrearSalidaComponent } from './inventario-crear-salida/inventario-crear-salida.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { InventarioSalidaSumaComponent } from './inventario-salida-suma/inventario-salida-suma.component';

@NgModule({
  declarations: [
    InventarioControlComponent,
    InventarioEditComponent,
    InventarioCrearComponent,
    InventarioControlSalidaComponent,
    InventarioEditSalidaComponent,
    InventarioSumaComponent,
    InventarioCatalogoComponent,
    InventarioSalidaCatalogoComponent,
    InventarioCrearSalidaComponent,
    InventarioSalidaSumaComponent
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
    MatListModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ]
})
export class InventarioModule { }
