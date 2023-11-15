import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AreasCreateComponent } from './areas-create/areas-create.component';
import { AreasEditComponent } from './areas-edit/areas-edit.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'areas',
    component: AreasListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'areascreate',
    component: AreasCreateComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'areasedit/:id',
    component: AreasEditComponent,
    // canActivate: [authGuard]
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AreasRoutingModule { }
