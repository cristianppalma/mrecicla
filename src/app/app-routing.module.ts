import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IndexComponent } from './index/index/index.component';
import { RecuperarContrasenaComponent } from './auth/recuperar-contrasena/recuperar-contrasena.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProduccionComponent } from './produccion/produccion/produccion.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path:'index', component: IndexComponent },
  { path: 'login', component: AuthComponent },
  { path:'registrarse', component: RegistroComponent},
  { path:'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path: 'dashboard', component: PagesComponent,
    children: [
      { path:'tablero', component:DashboardComponent },
      { path:'produccion', loadChildren: () => import('./produccion/produccion.module').then(m => m.ProduccionModule) },
      { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
      { path: 'control', loadChildren: () => import('./control/control.module').then(m => m.ControlModule) },
      { path:'inventario', loadChildren:() => import('./inventario/inventario.module').then(m => m.InventarioModule) },
      { path:'solicitudes', loadChildren:() => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule) },
      { path:'proveedor', loadChildren:() => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
      { path: 'empleado', loadChildren:() => import('./empleado/empleado.module').then(m=>m.EmpleadoModule) },
      { path:'maquinas', loadChildren:() => import('./maquinas/maquinas.module').then(m => m.MaquinasModule) },
      { path:'areas', loadChildren:() => import('./areas/areas.module').then(m => m.AreasModule) },
      // { path:'produccion', loadChildren:() => import('./produccion/produccion.module').then(m => m.ProduccionModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
