import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { AuthModule } from './auth/auth.module';
/*librerias axel*/
import { InventarioModule } from './inventario/inventario.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
/*librerioas benja*/
import { ControlModule } from './control/control.module';
import { ProduccionModule } from './produccion/produccion.module';

import { MatIconModule } from '@angular/material/icon';
import { IndexComponent } from './index/index/index.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MaquinasModule } from './maquinas/maquinas.module';
import { AreasModule } from './areas/areas.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DashboardComponent,
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
    MatIconModule,
    MaquinasModule,
    AreasModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
