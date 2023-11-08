import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasListComponent } from './maquinas-list/maquinas-list.component';
import { MaquinasCreateComponent } from './maquinas-create/maquinas-create.component';
import { MaquinasEditarComponent } from './maquinas-editar/maquinas-editar.component';
import { MaquinasEliminarComponent } from './maquinas-eliminar/maquinas-eliminar.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'maquinas',
    component: MaquinasListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'maquinascreate',
    component: MaquinasCreateComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'maquinaseditar/:id',
    component: MaquinasEditarComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'maquinasEliminar/:id',
    component: MaquinasEliminarComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'confirmation',
    component:ConfirmationDialogComponent,
    // canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaquinasRoutingModule { }
