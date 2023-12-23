import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from './control';
import { PeriodicElement } from './PeriodicElement';
@Injectable({
  providedIn: 'root'
})
export class ControlService {
  // URL DE LA LLAMADA A LA API
  API: string = 'https://recicladora.arvispace.com/PhpAngular/controlgastos/'

  // API: string = 'http://localhost/PhpAngular/controlgastos/';

  // CONSTANTES PARA GUARDAR EL CORREO Y NOMBRE DEL USUARIO DESDE EL LOCALSTORAGE
  private correo: string;
  private nombre: string;
  private area: string;
  private fabrica: string;
  private tipoUsuario: string;
  private asignacion: string;


  constructor( private clientService:HttpClient) {}


  getAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea=1");
  }

  getMaquinas(id:any){
    const url = this.API + "?selectMaquina=" + id;

  return this.clientService.get<any[]>(url);
  }

  getmaquinaria(){
    return this.clientService.get<any[]>(this.API+"?selectmaqui=1");
  }

  getEmpresas(){
    return this.clientService.get<any[]>(this.API+"?selectEmpresa=1");
  }

  getGastos(){
    return this.clientService.get<any[]>(this.API+"?selectGasto=1");
  }

  // AGREGAMOS UN NUEVO REGISTRO EN LA TABLA DE CONTROL DE GASTOS
  agregargasto(datosGasto:Gastos):Observable<any>{
    return this.clientService.post(this.API+"?insertarGastosPro=1",datosGasto);
  }

  // OBTENEMOS TODOS LOS REGISTROS DE LA TABLA CONTROL DE GASTOS
  listarGastos(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?obtenerGastos=1");
  }

  listarGastosporArea(id:any): Observable<PeriodicElement[]>{
    return this.clientService.get<PeriodicElement[]>(this.API+"?obtenerGastosArea="+id)
  }

  // ELIMINAMOS LOS DATOS DEL REGISTRO DE ACUERDO AL ID
  eliminargasto(id: any, usuarioEliminador: any): Observable<any> {
    return this.clientService.delete(`${this.API}?borrarGasto=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }

  // OBTENEMOS LOS DATOS DEL REGISTRO POR EL ID
  consultargasto(id: any): Observable<any> {
    //return this.clientService.get<PeriodicElement>(`${this.API}?idControl=${id}`);
    return this.clientService.get(this.API+"?consultarGasto="+id);
    // Reemplaza "?id=${id}" por la ruta correcta en tu API para obtener un registro por su ID.
  }

  // SE ACTUALIZAN TODOS LOS DATOS DEL REGISTRO OBTENIDO
  editargasto(id: any, datosGasto: Gastos): Observable<any> {
    return this.clientService.post(this.API+"?actualizarProvedores="+id, datosGasto);
    // Reemplaza "?editargasto=${id}" por la ruta correcta en tu API para editar un registro por su ID.
  }

  // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getCorreo(): string {
    return this.correo = localStorage.getItem("Correo") || '';
  }

  // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getNombre(): string {
    return this.nombre = localStorage.getItem("Nombre") || '';
  }

  getidArea(): string{
    return this.area = localStorage.getItem("idArea") || '';
  }

  getidFabrica(): string{
    return this.fabrica = localStorage.getItem("idFabrica") || '';
  }

  getTipoUsuario(): string {
    return this.tipoUsuario = localStorage.getItem("NombreTipoUser") || '';
  }

  getAsignacion():string{
    return this.asignacion = localStorage.getItem("Puesto") || '';
  }
}
