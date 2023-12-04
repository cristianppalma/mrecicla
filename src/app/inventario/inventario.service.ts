import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto } from './producto';
import { producto2 } from './Producto2';
import { PeriodicElement } from './PeriodicElement';
import { PeriodicElement2 } from './PeriodicElement2';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  API: string = 'https://recicladora.arvispace.com/PhpAngular/inventario/'
  API2: string = 'https://recicladora.arvispace.com/PhpAngular/inventarioSalida/'
  private correo: string;
  private nombre: string;
  //API: string = 'http://localhost/PhpAngular/inventario/';
  //API2: string = 'http://localhost/PhpAngular/inventarioSalida/';


  constructor( private clientService:HttpClient) { }

  agregarProducto(datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?insertarProducto=1",datosProducto);
  }

  listarInventario(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?ObtenerInventario=1");
  }

/*  borrarInventario(id:any):Observable<any>{
    return this.clientService.delete(this.API+"?borrarInventario="+id);
  }*/

  //Borrar con procedimientos curi

  borrarInventario(id:any,usuarioEliminador: any):Observable<any>{
    return this.clientService.delete(`${this.API}?BorrarInventario=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }
  //Actualizar y consultar
  consultarInventario(id:any): Observable<PeriodicElement> {
    return this.clientService.get<PeriodicElement>(this.API+"?consultarinventarioPro="+id);

  }

  editarproducto(id:any, datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?ActualizarInventario="+id,datosProducto);

  }

  selectAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea")
  }

  //inventario salida

  //Actualizar y consultar

  listarInventariosalida(): Observable<PeriodicElement2[]> {
    return this.clientService.get<PeriodicElement2[]>(this.API2+"?ObtenerProductos=1");
  }

  consultarInventarioSalida(id:any): Observable<PeriodicElement2> {
    return this.clientService.get<PeriodicElement2>(this.API2+"?ObtenerProductosPor="+id);

  }

  editarproductoSalida(id:any, datosProducto:producto2):Observable<any>{
    return this.clientService.post(this.API+"?ActualizarProductos="+id,datosProducto);

  }

  borrarInventarioSalida(id:any,usuarioEliminador: any):Observable<any>{
    return this.clientService.delete(`${this.API}?borrarInventarioSalida=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }
    // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
    getCorreo(): string {
      return this.correo = localStorage.getItem("Correo") || '';
    }

    // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
    getNombre(): string {
      return this.nombre = localStorage.getItem("Nombre") || '';
    }
}


