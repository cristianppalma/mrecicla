import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor';
import { PeriodicElement } from './PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  API: string = 'http://localhost/PhpAngular/';

  constructor( private clientService:HttpClient) { }

  agregarProveedor(datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?insertar=1",datosProveedor);
  }

 // listarProveedor(){
   // return this.clientService.get(this.API);
   //}

   listarProveedor(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API);
  }






  obtenerProveedor(id_proveedor:any):Observable<any>{
    return this.clientService.get(this.API+"?consultar="+id_proveedor);
  }

  editarProveedor(id_proveedor:any, datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?actualizar="+id_proveedor,datosProveedor);
  }





  borrarProveedor(id_proveedor:any):Observable<any>{
    return this.clientService.get(this.API+"?borrar="+id_proveedor);
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
