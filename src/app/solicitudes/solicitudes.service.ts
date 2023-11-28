import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { solicitud } from './solicitud';
import { PeriodicElement } from './PeriodicElement';
@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
 // API: string = 'https://recicladora.arvispace.com/PhpAngular/solicitudes/'

  API: string = 'http://localhost/PhpAngular/solicitudes/';
  private correo: string;
  private nombre: string;
  
  constructor( private clientService:HttpClient) { }

  agregarSolicitud(datosSolicitud:solicitud):Observable<any>{
    return this.clientService.post(this.API+"?insertarSolicitud=1",datosSolicitud);
  }

  listarSolicitud(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?Solicitudes=1");
  }

  /*borrarSolicitud(id:any):Observable<any>{
    return this.clientService.delete(this.API+"?borrarSolicitud="+id);
  }*/

  borrarSolicitud(id: any, usuarioEliminador: any): Observable<any> {
    return this.clientService.delete(`${this.API}?borrarSolicitud=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }
  

  //Actualizar y consultar
  consultarSolicitudes(id:any): Observable<PeriodicElement> {
    return this.clientService.get<PeriodicElement>(this.API+"?consultarSolicitudes="+id);

  }

  editarSolicitud(id:any, datosSolicitud:solicitud):Observable<any>{
    return this.clientService.post(this.API+"?editarSolicitud="+id,datosSolicitud);

  }
  selectProveedor(){
    return this.clientService.get<any[]>(this.API+"?selectProveedor")
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
