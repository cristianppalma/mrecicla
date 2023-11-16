import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado} from './Empleado' ;
import { listaEmpleado } from './listaEmpleado';
import {editarEmpleado} from './editarEmpleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  //API: string = 'https://recicladora.arvispace.com/PhpAngular/'

   API: string = 'http://localhost/PhpAngular/';
  
   constructor( private clientService:HttpClient) { }
  AgregarUsuartio(datosEmpleado:Empleado):Observable<any>{
    return this.clientService.post(this.API+"?insertarEmpleado=",datosEmpleado);
  }

  listaEmpleado(): Observable<listaEmpleado[]> {
    return this.clientService.get<listaEmpleado[]>(this.API+"?seleccionarEmpleado=1");
  }

  eliminarUsuario(id:string): Observable<listaEmpleado[]> {
    return this.clientService.get<listaEmpleado[]>(this.API+"?borrarEmpleado="+id);
  }

  EditarEmpleado(id:string): Observable<editarEmpleado> {
    return this.clientService.get<editarEmpleado>(this.API+"?editarEmpleado="+id);
  }

  UpdateEmpleado(UpdateEmpleado:editarEmpleado, id:any):Observable<any>{
    return this.clientService.post(this.API+"?updateEmpleado="+id,UpdateEmpleado);
  }

  SelectAreas (){
    return this.clientService.get<any[]>(this.API+"?selectArea");
  }



SelectPuestos (){
  return this.clientService.get<any[]>(this.API+"?selectPuesto");
}

SelectTipoUsuarios (){
  return this.clientService.get<any[]>(this.API+"?selectTipoUsuario");
}

}


