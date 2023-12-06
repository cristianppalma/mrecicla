import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaCreateComponent } from './empresa-create/empresa-create.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';


const routes: Routes = [
  {
    path: 'empresas',
    component: EmpresaListComponent,
  },
  {
    path: 'empresaCreate',
    component: EmpresaCreateComponent,
  },
  {
    path: 'empresaEdit/:id',
    component: EmpresaEditComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
