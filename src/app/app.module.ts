import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { AuthModule } from './auth/auth.module';
import { InventarioModule } from './inventario/inventario.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { ControlModule } from './control/control.module';
import { ProduccionModule } from './produccion/produccion.module';
import { ProduccionEmpleadoModule } from './produccionEmpleado/produccion-empleado.module';
import { EmpresaModule } from './empresas/empresa.module';
import { MatIconModule } from '@angular/material/icon';
import { IndexComponent } from './index/index/index.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MaquinasModule } from './maquinas/maquinas.module';
import { AreasModule } from './areas/areas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatalogosComponent } from './catalogos/catalogos/catalogos.component';

import { ExporterService } from './services/exporter.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DashboardComponent,
    CatalogosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    ProveedorModule,
    AuthModule,
    InventarioModule,
    SolicitudesModule,
    ControlModule,
    ProduccionModule,
    ProduccionEmpleadoModule,
    EmpresaModule,
    MatIconModule,
    MaquinasModule,
    AreasModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ExporterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
