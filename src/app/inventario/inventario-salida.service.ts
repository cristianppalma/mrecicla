import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto2 } from './Producto2';
import { PeriodicElement2 } from './PeriodicElement2';

@Injectable({
  providedIn: 'root'
})
export class InventarioSalidaService {

  API: string = 'https://recicladora.arvispace.com/PhpAngular/inventarioSalida/'

  //API: string = 'http://localhost/PhpAngular/inventarioSalida/';

  private correo: string;
  private nombre: string;
  private idFabricaUsuario: string;


  constructor( private clientService:HttpClient) { }


  selectAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea")
  }


  getProductosSalida(){
    return this.clientService.get<any[]>(this.API+"?selectInventarioSalida");
  }

  //inventario salida

  //Actualizar y consultar

  listarInventariosalida(): Observable<PeriodicElement2[]> {
    return this.clientService.get<PeriodicElement2[]>(this.API+"?obtenerProductosSalida=1");
  }

  agregarInventarioSalida(datosProducto:producto2):Observable<any>{
    return this.clientService.post(this.API+"?insertarInventarioSalidaPro=1",datosProducto);
  }

  consultarInventarioSalida(id:any): Observable<any> {
    return this.clientService.get<PeriodicElement2>(this.API+"?obtenerProductosSalidaPorID="+id);

  }

  editarproductoSalida(id:any, datosProducto:producto2):Observable<any>{
    return this.clientService.post(this.API+"?actualizarProductos="+id,datosProducto);

  }

  borrarInventarioSalida(id:any,usuarioEliminador: any):Observable<any>{
    return this.clientService.get(`${this.API}?borrarInventarioSalida=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }
    // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
    getCorreo(): string {
      return this.correo = localStorage.getItem("Correo") || '';
    }

    // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
    getNombre(): string {
      return this.nombre = localStorage.getItem("Nombre") || '';
    }

        // OBTENEMOS idfabrica del usuario por LOCALSTORAGE
    getIdFabricaUsuario(): string {
      return this.idFabricaUsuario = localStorage.getItem("idFabrica") || '';
    }
}
