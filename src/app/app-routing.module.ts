import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IndexComponent } from './index/index/index.component';
import { RecuperarContrasenaComponent } from './auth/recuperar-contrasena/recuperar-contrasena.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path:'index', component: IndexComponent },
  { path:'login', component: AuthComponent },
  { path:'registrarse', component: RegistroComponent},
  { path:'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path:'dashboard', component: PagesComponent,
    children: [
      { path:'tablero', component:DashboardComponent },
      { path:'proveedor',
        loadChildren:() => import('./proveedor/proveedor.module').then(m => m.ProveedorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
