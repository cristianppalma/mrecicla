import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { empresa } from './empresa';
import { PeriodicElement } from './PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  API: string = 'https://recicladora.arvispace.com/PhpAngular/empresas/'

  // API: string = 'http://localhost/PhpAngular/empresas/';

  private correo: string;
  private nombre: string;

  constructor( private clientService:HttpClient ) { }

  listarEmpresas(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?obtenerEmpresas=1");
  }

  agregarEmpresas(datosEmpresa:empresa): Observable<any> {
    return this.clientService.post(this.API+"?insertarEmpresaPro=1",datosEmpresa);
  }

  eliminarEmpresas(id:any, usuarioEliminador:any):Observable<any>{
    return this.clientService.get(`${this.API}?borrarEmpresa=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }

  obtenerEmpresasPorId(id:string):Observable<any>{
    return this.clientService.get(this.API+"?obtenerEmpresaPorID="+id);
  }

  actualizarEmpresas(id:any, datosEmpresa:empresa):Observable<any>{
    return this.clientService.post(this.API+"?actualizarEmpresas="+id,datosEmpresa);
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
