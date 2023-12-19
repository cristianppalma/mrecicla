import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Areas } from './areas';
import { areasList } from './areasList';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  // API: string = 'https://recicladora.arvispace.com/PhpAngular/areas/'

  API: string = 'http://localhost/PhpAngular/areas/';
 private correo: string;
 private nombre: string;
 private fabrica: string;

  constructor( private clientService:HttpClient) { }

  getAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea=1");
  }


  //Agregar areas
  /*agregarArea(datosArea:Areas):Observable<any>{
    return this.clientService.post(this.API+"?insertarAreas=1",datosArea);
  }*/
  //Agregar areas con procedimientos
  agregarArea(datosArea:Areas):Observable<any>{
    return this.clientService.post(this.API+"?insertarAreasPro=1",datosArea);
  }


  //Listar areas
  /*listarAreas(): Observable<areasList[]> {
    return this.clientService.get<areasList[]>(this.API+"?seleccionarAreas=1");
  }*/

  //Listar  areas con procedimientos
  listarAreas(): Observable<areasList[]> {
    return this.clientService.get<areasList[]>(this.API+"?obtenerAreas=1");
  }


  /*eliminarArea(id: any): Observable<any> {
    return this.clientService.delete(this.API + "?borrarArea=" + id);
  }*/
 //Eliminar Area procedimiento
  eliminarArea(id: any, usuarioEliminador: any): Observable<any> {
    return this.clientService.delete(`${this.API}?borrarArea=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }

  consultarArea(id: any):Observable<any>{
    return this.clientService.get(this.API + "?consultarArea=" + id);
  }

  actualizarArea(id: any, datosArea: Areas): Observable<any> {
    return this.clientService.post(this.API + "?actualizarAreas=" + id, datosArea);
  }


   // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
   getCorreo(): string {
    return this.correo = localStorage.getItem("Correo") || '';
  }

  // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getNombre(): string {
    return this.nombre = localStorage.getItem("Nombre") || '';
  }
  getidFabrica(): string{
    return this.fabrica = localStorage.getItem("idFabrica") || '';
  }
}
