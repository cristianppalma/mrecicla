import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto } from './producto';
import { PeriodicElement } from './PeriodicElement';
import { PeriodicElement2 } from './PeriodicElement2';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  //API: string = 'https://recicladora.arvispace.com/PhpAngular/inventario/'

   API: string = 'http://localhost/PhpAngular/inventario/';
   API2: string = 'http://localhost/PhpAngular/inventarioSalida/';
   

  constructor( private clientService:HttpClient) { }

  agregarProducto(datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?insertarProducto=1",datosProducto);
  }

  listarInventario(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?Inventario=1");
  }

  borrarInventario(id:any):Observable<any>{
    return this.clientService.delete(this.API+"?borrarInventario="+id);
  }

  //Actualizar y consultar
  consultarInventario(id:any): Observable<PeriodicElement> {
    return this.clientService.get<PeriodicElement>(this.API+"?ObtenerInventario="+id);

  }

  editarproducto(id:any, datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?editarproducto="+id,datosProducto);

  }

  selectAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea")
  }

  listarInventariosalida(): Observable<PeriodicElement2[]> {
    return this.clientService.get<PeriodicElement2[]>(this.API2+"?ObtenerProductos=1");
  }

}


