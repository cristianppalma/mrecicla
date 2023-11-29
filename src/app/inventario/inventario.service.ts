import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto';
import { PeriodicElement } from './PeriodicElement';
import { PeriodicElement2 } from './PeriodicElement2';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  // URL DE LA LLAMADA A LA API
  //API: string = 'https://recicladora.arvispace.com/PhpAngular/inventario/'

   API: string = 'http://localhost/PhpAngular/inventario/';
   API2: string = 'http://localhost/PhpAngular/inventarioSalida/';

  // CONSTANTES PARA GUARDAR EL CORREO Y NOMBRE DEL USUARIO DESDE EL LOCALSTORAGE
  private correo: string;
  private nombre: string;

  constructor( private clientService:HttpClient) { }

  agregarProducto(datosProducto:Producto):Observable<any>{
    return this.clientService.post(this.API+"?insertarProducto=1",datosProducto);
  }

  listarInventario(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?Inventario=1");
  }

  borrarInventario(id:any, usuarioElimina: any):Observable<any>{
    return this.clientService.delete(`${this.API}?borrarInventario=${id}&UsuarioEliminador=${usuarioElimina}`);
  }

  //Actualizar y consultar
  consultarInventario(id:any): Observable<PeriodicElement> {
    return this.clientService.get<PeriodicElement>(this.API+"?ObtenerInventario="+id);

  }

  editarproducto(id:any, datosProducto:Producto):Observable<any>{
    return this.clientService.post(this.API+"?editarproducto="+id,datosProducto);

  }

  selectAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea")
  }

   // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
   getCorreo(): string {
    return this.correo = localStorage.getItem("Correo") || '';
  }

  // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getNombre(): string {
    return this.nombre = localStorage.getItem("Nombre") || '';
  }


  listarInventariosalida(): Observable<PeriodicElement2[]> {
    return this.clientService.get<PeriodicElement2[]>(this.API2+"?ObtenerProductos=1");
  }

}


