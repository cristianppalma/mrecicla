import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './auth/registro/registro.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path:'login', component: AuthComponent },
  { path:'registrarse', component: RegistroComponent},
  { path:'dashboard', component: PagesComponent,
    children: [
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
