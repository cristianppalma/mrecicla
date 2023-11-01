import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Proveedor } from './proveedor';
import { PeriodicElement } from './PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  API: string = 'http://localhost/PhpAngular/proveedores/';

  constructor( private clientService:HttpClient) { }

  agregarProveedor(datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?insertar=1",datosProveedor);
  }

   listarProveedor(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API);
  }

  borrarProveedor(id_proveedor:any):Observable<any>{
    return this.clientService.get(this.API+"?borrar="+id_proveedor);
  }

  // obtenerDatosProveedor(id_proveedor: string): Observable<any> {
  //   const url = `${this.API}?consultar=${id_proveedor}`;

  //   return this.clientService.get(url).pipe(
  //     map((response: any) => {
  //       if (Array.isArray(response)) {
  //         // Si la respuesta es un array, puedes procesarla como un array de objetos JSON
  //         for (const proveedor of response) {
  //           console.log('ID del proveedor:', proveedor.id_proveedor);
  //           console.log('Nombre del proveedor:', proveedor.name_proveedor);
  //           console.log('Producto del proveedor:', proveedor.producto_proveedor);
  //           console.log('Direccion del proveedor:', proveedor.direccion_proveedor_proveedor);
  //           console.log('RFC del proveedor:', proveedor.rfc_proveedor_proveedor);
  //           console.log('Descripcion del proveedor:', proveedor.description_proveedor_proveedor);

  //         }
  //         return response;
  //       } else {
  //         console.error('La respuesta no es un array JSON válido:', response);
  //         return [];
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error en la solicitud:', error);
  //       return [];
  //     })
  //   );
  // }

  obtenerProveedor(id_proveedor:string):Observable<any>{
    return this.clientService.get(this.API+"?consultar="+id_proveedor);
  }

  editarProveedor(id_proveedor:any, datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?actualizar="+id_proveedor,datosProveedor);
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
