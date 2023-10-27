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



import { ControlModule } from './control/control.module';


@NgModule({
  declarations: [
    AppComponent,
    
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
