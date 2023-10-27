import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesControlComponent } from './solicitudes-control/solicitudes-control.component';
import { SolicitudesCrearComponent } from './solicitudes-crear/solicitudes-crear.component';
import { SolicitudesEditComponent } from './solicitudes-edit/solicitudes-edit.component';
const routes: Routes = [
  {path:'solicitudes',component: SolicitudesControlComponent},
  {path:'SolicitudesCrear', component:SolicitudesCrearComponent},
  {path:'SolicitudesEdit',component:SolicitudesEditComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
