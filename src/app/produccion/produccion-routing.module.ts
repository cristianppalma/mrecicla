import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduccionComponent } from './produccion/produccion.component';
import { ProduccionListComponent } from './produccion-list/produccion-list.component';
import { ProduccionCreateComponent } from './produccion-create/produccion-create.component';
import { ProduccionEditarComponent } from './produccion-editar/produccion-editar.component';

const routes: Routes = [
  {
    path: 'produccion',
    component:ProduccionComponent
  },
  {
    path: 'produccionList',
    component:ProduccionListComponent
  },
  {
    path: 'produccionCreate',
    component:ProduccionCreateComponent
  },
  {
    path: 'produccionEditar/:id',
    component:ProduccionEditarComponent
  }
 ];

 @NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
