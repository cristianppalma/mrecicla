import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlGastosComponent } from './control-gastos/control-gastos.component';
import { ControlGastosGeneralesComponent } from './control-gastos-generales/control-gastos-generales.component';
import { ControlGastosGeneralesEditarComponent } from './control-gastos-generales-editar/control-gastos-generales-editar.component';
import { ControlGastosGeneralesCrearComponent } from './control-gastos-generales-crear/control-gastos-generales-crear.component';

const routes: Routes = [
 {path: 'control', component:ControlGastosComponent},
 {path: 'controlGastos', component:ControlGastosComponent},
 {path: 'controlGastosGenerales', component:ControlGastosGeneralesComponent},
 {path: 'controlGastosGeneralesCrear', component:ControlGastosGeneralesCrearComponent},
 {path: 'controlGastosGeneralesEditar/:id', component:ControlGastosGeneralesEditarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
