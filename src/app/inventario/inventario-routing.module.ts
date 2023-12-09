import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioControlComponent } from './inventario-control/inventario-control.component';
import { InventarioCrearComponent } from './inventario-crear/inventario-crear.component';
import { InventarioEditComponent } from './inventario-edit/inventario-edit.component';
import { InventarioSalidaCatalogoComponent } from './inventario-salida-catalogo/inventario-salida-catalogo.component';
import { InventarioControlSalidaComponent } from './inventario-control-salida/inventario-control-salida.component';
import { InventarioCrearSalidaComponent } from './inventario-crear-salida/inventario-crear-salida.component';
import { InventarioEditSalidaComponent } from './inventario-edit-salida/inventario-edit-salida.component';
import { InventarioSalidaSumaComponent } from './inventario-salida-suma/inventario-salida-suma.component';
import { InventarioSumaComponent } from './inventario-suma/inventario-suma.component';
import { InventarioCatalogoComponent } from './inventario-catalogo/inventario-catalogo.component';


const routes: Routes = [
  {
    path: 'inventarioCatalogo',
    component: InventarioCatalogoComponent,
  },
  {
    path: 'inventarios',
    component: InventarioControlComponent,
  },
  {
    path: 'inventarioCrear',
    component: InventarioCrearComponent,
  },
  {
    path: 'inventarioEdit/:id',
    component: InventarioEditComponent,
  },
  {
    path: 'catalogo-inventario-salida',
    component: InventarioSalidaCatalogoComponent,
  },
  {
    path: 'inventarioCrearSalida',
    component: InventarioCrearSalidaComponent,
  },
  {
    path: 'inventarioEditSalida/:id',
    component : InventarioEditSalidaComponent,
  },
  {
    path:'inventarioSalida',
    component:InventarioControlSalidaComponent,
  },
  {
    path: 'suma-a-inventario-salida',
    component: InventarioSalidaSumaComponent,
  },
  {
    path:'inventarioSuma',
    component: InventarioSumaComponent

  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
