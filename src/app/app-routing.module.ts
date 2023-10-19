import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioModule } from './usuario/usuario.module';
import { ListaDeEmpleadosComponent } from './usuario/admin/lista-de-empleados/lista-de-empleados.component';
const routes: Routes = [
   //cuando el usuario no ponga nada
  { path: "", redirectTo: "index", pathMatch: "full" },
 //componentes usuario
 // admin 
 {path:"listaEmp",component: ListaDeEmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
