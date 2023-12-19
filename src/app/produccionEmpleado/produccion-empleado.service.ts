import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './PeriodicElement';
import { Produccion } from './produccion';

@Injectable({
  providedIn: 'root'
})
export class ProduccionEmpleadoService {
  // URL DE LA LLAMADA A LA API
  //API: string = 'https://recicladora.arvispace.com/PhpAngular/produccionarea/';

  API: string = 'http://localhost/PhpAngular/produccionarea/';

  private correo: string;
  private nombre: string;
  private iduser: string;

  constructor(
    private clientService: HttpClient
  ) { }

  // SERVICIO PARA TRAER TODOS LOS REGISTROS A NIVEL ADMIN
  listarProduccionGeneral(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?obtenerProduccionAdmin=1");
  }

  //Con procedimiento almacenado
  listarProduccionArea(id:any): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?obtenerProduccionArea="+id);
  }

  // SERVICIO PARA AGREGAR UN REGISTRO
  agregarProduccionArea(datosProduccionArea:Produccion):Observable<any>{
    return this.clientService.post(this.API+"?insertarProduccionArea=1",datosProduccionArea);
  }

  // SERVICIO PARA VER LOS DETALLES DE UN REGISTRO
  verDetallesProduccionArea(idProduccionArea:any): Observable<any> {
    return this.clientService.get(this.API+"?consultarProduccionArea="+idProduccionArea);
  }

  //SERVICIO PARA ACTUALIZAR EL REGISTRO
  actualizarProduccionArea(idProduccionArea:any, datosProduccionArea:Produccion):Observable<any>{
    return this.clientService.post(this.API+"?actualizarProduccionArea="+idProduccionArea,datosProduccionArea);
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
  selectInventarioSalida(){
    return this.clientService.get<any[]>(this.API+"?selectInventarioSalida");
  }

  // SERVICIO PARA TRAER LOS REGISTROS DE LA TABLA PRODUCTOS
  selectProductoEntrada(){
    return this.clientService.get<any[]>(this.API+"?selectProductoEntrada");
  }

  selectUsuarios(){
    return this.clientService.get<any[]>(this.API+"?selectUsuarios");
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

}
