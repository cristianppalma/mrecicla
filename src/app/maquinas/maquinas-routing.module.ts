import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasListComponent } from './maquinas-list/maquinas-list.component';
import { MaquinasCreateComponent } from './maquinas-create/maquinas-create.component';
import { MaquinasEditarComponent } from './maquinas-editar/maquinas-editar.component';
import { MaquinasEliminarComponent } from './maquinas-eliminar/maquinas-eliminar.component';


const routes: Routes = [
 {path: 'maquinas', component:MaquinasListComponent},
 {path: 'maquinascreate', component:MaquinasCreateComponent},
 {path: 'maquinaseditar/:id', component:MaquinasEditarComponent},
 {path: 'maquinasEliminar/:id', component:MaquinasEliminarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaquinasRoutingModule { }
