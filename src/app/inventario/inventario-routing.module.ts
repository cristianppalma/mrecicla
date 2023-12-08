import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioControlComponent } from './inventario-control/inventario-control.component';
import { InventarioCrearComponent } from './inventario-crear/inventario-crear.component';
import { InventarioEditComponent } from './inventario-edit/inventario-edit.component';
import { authGuard } from '../guards/auth.guard';
import { InventarioControlSalidaComponent } from './inventario-control-salida/inventario-control-salida.component';
import { InventarioEditSalidaComponent } from './inventario-edit-salida/inventario-edit-salida.component';
import { InventarioSumaComponent } from './inventario-suma/inventario-suma.component';
import { InventarioCatalogoComponent } from './inventario-catalogo/inventario-catalogo.component';


const routes: Routes = [
  {
    path: 'inventarioCatalogo',
    component: InventarioCatalogoComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'inventarios',
    component: InventarioControlComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'inventarioCrear',
    component: InventarioCrearComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'inventarioEdit/:id',
    component: InventarioEditComponent,
    // canActivate: [authGuard]
  },
  {path:'inventarioSalida',component:InventarioControlSalidaComponent},
  {
    path: 'inventarioEditSalida/:id',
    component : InventarioEditSalidaComponent,
    // canActivate: [authGuard]
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
