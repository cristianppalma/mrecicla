import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './PeriodicElement';
import { Produccion } from './produccion';

@Injectable({
  providedIn: 'root'
})
export class ProduccionEmpleadoService {

  private correo: string;
  private nombre: string;
  private iduser: string;

  API: string = 'http://localhost/PhpAngular/produccionarea/';

  constructor(
    private clientService: HttpClient
  ) { }

  // CONEXION DE FRONTEND CON BACKEND
  // SERVICIO PARA TRAER TODOS LOS REGISTROS
  listarProduccionArea(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API);
  }

  // SERVICIO PARA AGREGAR UN REGISTRO
  agregarProduccionArea(datosProduccionArea:Produccion):Observable<any>{
    return this.clientService.post(this.API+"?insertarProduccionArea=1",datosProduccionArea);
  }

  // SERVICIO PARA VER LOS DETALLES DE UN REGISTRO
  verDetallesProduccionArea(idProduccionArea:string): Observable<any> {
    return this.clientService.get(this.API+"?consultarProduccionArea="+idProduccionArea);
  }

  // SERVICIO PARA TRAER TODOS LOS REGISTROS DE LA TABLA MAQUINARIA
  selectMaquinaria(){
    return this.clientService.get<any[]>(this.API+"?selectMaquinaria");
  }

  // SERVICIO PARA TRAER LOS REGISTROS DE LA TABLA AREAS
  selectAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea");
  }

  // SERVICIO PARA TRAER LOS REGISTROS DE LA TABLA INVENTARIO SALIDA
  selectSalida(){
    return this.clientService.get<any[]>(this.API+"?selectSalida");
  }



  // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getId(): string {
    return this.iduser = localStorage.getItem("id_user") || '';
  }

  // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getCorreo(): string {
    return this.correo = localStorage.getItem("Correo") || '';
  }

  // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getNombre(): string {
    return this.nombre = localStorage.getItem("Nombre") || '';
  }

  // setCorreo(nuevoCorreo: string): void{
  //   this.correo = nuevoCorreo;
  //   localStorage.setItem("Correo", nuevoCorreo);
  // }

}
