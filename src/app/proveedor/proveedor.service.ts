import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor';
import { PeriodicElement } from './PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  // URL DE LA LLAMADA A LA API
  // API: string = 'https://recicladora.arvispace.com/PhpAngular/proveedores/'

  API: string = 'http://localhost/PhpAngular/proveedores/';

  // CONSTANTES PARA GUARDAR EL CORREO Y NOMBRE DEL USUARIO DESDE EL LOCALSTORAGE
  private correo: string;
  private nombre: string;

  constructor( private clientService:HttpClient) { }

  // AGREGAMOS UN NUEVO REGISTRO EN LA TABLA PROVEEDORES
  agregarProveedor(datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?insertar=1",datosProveedor);
  }

  // OBTENEMOS TODOS LOS REGISTROS DE LA TABLA PROVEEDORES
  listarProveedor(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API);
  }

  // ELIMINAMOS LOS DATOS DEL REGISTRO DE ACUERDO AL ID
  borrarProveedor(idProveedor:any, usuarioEliminador: any):Observable<any>{
    return this.clientService.get(`${this.API}?borrar=${idProveedor}&UsuarioEliminador=${usuarioEliminador}`);
  }

  // OBTENEMOS LOS DATOS DEL REGISTRO POR EL ID
  obtenerProveedor(idProveedor:string):Observable<any>{
    return this.clientService.get(this.API+"?consultar="+idProveedor);
  }

  // SE ACTUALIZAN TODOS LOS DATOS DEL REGISTRO OBTENIDO
  editarProveedor(idProveedor:any, datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?actualizar="+idProveedor,datosProveedor);
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


//SEPARACION DE LOS SERVICIOS

// import { Injectable } from '@angular/core';

// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Proveedor } from './proveedor';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProveedorService {

//   API:string='http://localhost/recicla/proveedores/';

//   constructor(private clientHttp:HttpClient) { }

//   agregarProveedor(datosProveedor:Proveedor):Observable<any>{
//     return this.clientHttp.post(this.API+"?insertar=1",datosProveedor);
//   }

//   obtenerProveedores(){
//     return this.clientHttp.get(this.API);
//   }

//   borrarProveedor(id_proveedor:any):Observable<any>{
//     return this.clientHttp.get(this.API+"?borrar="+id_proveedor);
//   }

//   obtenerProveedor(id_proveedor:any):Observable<any>{
//     return this.clientHttp.get(this.API+"?consultar="+id_proveedor);
//   }

//   editarProveedor(id_proveedor:any, datosProveedor:any):Observable<any>{
//     return this.clientHttp.post(this.API+"?actualizar="+id_proveedor,datosProveedor);

//   }
// }
