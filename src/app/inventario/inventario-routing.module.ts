import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioControlComponent } from './inventario-control/inventario-control.component';
import { InventarioCrearComponent } from './inventario-crear/inventario-crear.component';
import { InventarioEditComponent } from './inventario-edit/inventario-edit.component';
import { InventarioControlSalidaComponent } from './inventario-control-salida/inventario-control-salida.component';
const routes: Routes = [
  {path:'inventarios',component: InventarioControlComponent},
  {path:'inventarioCrear', component:InventarioCrearComponent},
  {path:'inventarioEdit/:id',component:InventarioEditComponent},
  {path:'inventarioSalida',component:InventarioControlSalidaComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
