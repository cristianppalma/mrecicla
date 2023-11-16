import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlGastosComponent } from './control-gastos/control-gastos.component';
import { ControlGastosGeneralesComponent } from './control-gastos-generales/control-gastos-generales.component';
import { ControlGastosGeneralesEditarComponent } from './control-gastos-generales-editar/control-gastos-generales-editar.component';
import { ControlGastosGeneralesCrearComponent } from './control-gastos-generales-crear/control-gastos-generales-crear.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'control',
    component: ControlGastosComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'controlGastos',
    component: ControlGastosComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'controlGastosGenerales',
    component: ControlGastosGeneralesComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'controlGastosGeneralesCrear',
    component: ControlGastosGeneralesCrearComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'controlGastosGeneralesEditar/:id',
    component: ControlGastosGeneralesEditarComponent,
    // canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
