import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from './control';
import { PeriodicElement } from './PeriodicElement';
@Injectable({
  providedIn: 'root'
})
export class ControlService {
  API: string = 'https://recicladora.arvispace.com/PhpAngular/controlgastos/'

  // API: string = 'http://localhost/PhpAngular/controlgastos/';

  constructor( private clientService:HttpClient) {}
    agregargasto(datosControl:Gastos):Observable<any>{
      return this.clientService.post(this.API+"?insertarGastos=1",datosControl);
    }

   listarGastos(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?seleccionarGastos=1");
  }

  eliminargasto(id: any): Observable<any> {
  return this.clientService.delete(this.API+"?eliminargasto="+ id);
  }

  consultargasto(id: any): Observable<PeriodicElement> {
    //return this.clientService.get<PeriodicElement>(`${this.API}?idControl=${id}`);
    return this.clientService.get<PeriodicElement>(this.API+"?consultargasto="+id);
    // Reemplaza "?id=${id}" por la ruta correcta en tu API para obtener un registro por su ID.
  }

  editargasto(id: any, datosGasto: Gastos): Observable<any> {
    return this.clientService.post(this.API+"?editargasto="+id, datosGasto);
    // Reemplaza "?editargasto=${id}" por la ruta correcta en tu API para editar un registro por su ID.
  }

}
