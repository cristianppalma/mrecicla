import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IndexComponent } from './index/index/index.component';

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path:'index', component: IndexComponent },
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
