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
  //API: string = 'https://recicladora.arvispace.com/PhpAngular/proveedores/'

  API: string = 'http://localhost/PhpAngular/proveedores/';

  // CONSTANTES PARA GUARDAR EL CORREO Y NOMBRE DEL USUARIO DESDE EL LOCALSTORAGE
  private correo: string;
  private nombre: string;
  private  idFabricaUsuario: string;

  constructor( private clientService:HttpClient) { }

  getProveedores(){
    return this.clientService.get<any[]>(this.API+"?selectProveedor=1");
  }

  // AGREGAMOS UN NUEVO REGISTRO EN LA TABLA PROVEEDORES
  agregarProveedor(datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?insertarProvedoresPro=1",datosProveedor);
  }

  listarProveedor(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?obtenerProvedores=1");
  }

  // ELIMINAMOS LOS DATOS DEL REGISTRO DE ACUERDO AL ID
  borrarProveedor(idProveedor:any, usuarioEliminador: any):Observable<any>{
    return this.clientService.get(`${this.API}?borrarProveedor=${idProveedor}&UsuarioEliminador=${usuarioEliminador}`);
  }

  // OBTENEMOS LOS DATOS DEL REGISTRO POR EL ID
  obtenerProveedor(idProveedor:string):Observable<any>{
    return this.clientService.get(this.API+"?consultarProveedor="+idProveedor);
  }

  // SE ACTUALIZAN TODOS LOS DATOS DEL REGISTRO OBTENIDO
  editarProveedor(idProveedor:any, datosProveedor:Proveedor):Observable<any>{
    return this.clientService.post(this.API+"?actualizarProvedores="+idProveedor,datosProveedor);
  }

  // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getCorreo(): string {
    return this.correo = localStorage.getItem("Correo") || '';
  }

  // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
  getNombre(): string {
    return this.nombre = localStorage.getItem("Nombre") || '';
  }

  // OBTENEMOS idfabrica del usuario por LOCALSTORAGE
  getIdFabricaUsuario(): string {
    return this.idFabricaUsuario = localStorage.getItem("idFabrica") || '';
  }

}
