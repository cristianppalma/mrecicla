import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IndexComponent } from './index/index/index.component';
import { RecuperarContrasenaComponent } from './auth/recuperar-contrasena/recuperar-contrasena.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProduccionComponent } from './produccion/produccion/produccion.component';
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'registrarse',
    component: RegistroComponent
  },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasenaComponent
  },
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'tablero',
        component:DashboardComponent
      },
      {
        path:'produccion',
        loadChildren: () =>
        import('./produccion/produccion.module').then(m => m.ProduccionModule)
      },
      {
        path:'produccion-empleado',
        loadChildren: () =>
        import('./produccionEmpleado/produccion-empleado.module').then(m => m.ProduccionEmpleadoModule),
        canActivate: [rolesGuard],
      },
      {
        path: 'control',
        loadChildren: () =>
        import('./control/control.module').then(m => m.ControlModule),
        canActivate: [rolesGuard],
      },
      {
        path: 'inventario',
        loadChildren: () =>
        import('./inventario/inventario.module').then(m => m.InventarioModule),
        canActivate: [rolesGuard],
      },
      {
        path: 'solicitudes',
        loadChildren: () =>
        import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule)
      },
      {
        path: 'proveedor',
        loadChildren: () =>
        import('./proveedor/proveedor.module').then(m => m.ProveedorModule),
        canActivate: [rolesGuard],
      },
      {
        path: 'empleado',
        loadChildren: () =>
        import('./empleado/empleado.module').then(m=>m.EmpleadoModule),
        canActivate: [rolesGuard],
      },
      {
        path: 'maquinas',
        loadChildren: () =>
        import('./maquinas/maquinas.module').then(m => m.MaquinasModule),
        canActivate: [rolesGuard],
      },
      {
        path: 'areas',
        loadChildren: () =>
        import('./areas/areas.module').then(m => m.AreasModule),
        canActivate: [rolesGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
