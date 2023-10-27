import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path:'login', component: AuthComponent },
  { path:'dashboard', component: PagesComponent,
    children: [
      { path:'proveedor',
        loadChildren:() => import('./proveedor/proveedor.module').then(m => m.ProveedorModule)
      }
    ]
  },
  { path:'dashboard', component: PagesComponent,
    children: [
      { path:'inventario',
        loadChildren:() => import('./inventario/inventario.module').then(m => m.InventarioModule)
      }
    ]
  },
  { path:'dashboard', component: PagesComponent,
    children: [
      { path:'solicitudes',
        loadChildren:() => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
