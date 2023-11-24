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
 //API: string = 'https://recicladora.arvispace.com/PhpAngular/controlgastos/'

 API: string = 'http://localhost/PhpAngular/controlgastos/';

  // CONSTANTES PARA GUARDAR EL CORREO Y NOMBRE DEL USUARIO DESDE EL LOCALSTORAGE
  private correo: string;
  private nombre: string;

  constructor( private clientService:HttpClient) {}

    // AGREGAMOS UN NUEVO REGISTRO EN LA TABLA DE CONTROL DE GASTOS
    agregargasto(datosGasto:Gastos):Observable<any>{
      return this.clientService.post(this.API+"?insertarGastos=1",datosGasto);
    }

   // OBTENEMOS TODOS LOS REGISTROS DE LA TABLA CONTROL DE GASTOS
   listarGastos(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?seleccionarGastos=1");
  }

  // ELIMINAMOS LOS DATOS DEL REGISTRO DE ACUERDO AL ID
  eliminargasto(id: any, usuarioEliminador: any): Observable<any> {
  return this.clientService.delete(`${this.API}?eliminargasto=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }

  // OBTENEMOS LOS DATOS DEL REGISTRO POR EL ID
  consultargasto(id: any): Observable<PeriodicElement> {
    //return this.clientService.get<PeriodicElement>(`${this.API}?idControl=${id}`);
    return this.clientService.get<PeriodicElement>(this.API+"?consultargasto="+id);
    // Reemplaza "?id=${id}" por la ruta correcta en tu API para obtener un registro por su ID.
  }

  // SE ACTUALIZAN TODOS LOS DATOS DEL REGISTRO OBTENIDO
  editargasto(id: any, datosGasto: Gastos): Observable<any> {
    return this.clientService.post(this.API+"?editargasto="+id, datosGasto);
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

}
