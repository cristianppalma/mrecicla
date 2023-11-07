import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from './maquina';
import { PeriodicElement } from './PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {
  API: string = 'https://recicladora.arvispace.com/PhpAngular/'

  // API: string = 'http://localhost/PhpAngular/';
  constructor( private clientService:HttpClient) { }

  agregarMaquina(datosMaquina:Maquina):Observable<any>{
    return this.clientService.post(this.API+"?insertar=1",datosMaquina);
  }


   listarMaquina(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?seleccionar=1");
  }

  eliminarMaquina(id: any): Observable<any> {
    return this.clientService.delete(this.API + "?borrar=" + id);
  }

  consultarmaquina(id: any):Observable<any>{
    return this.clientService.get(this.API + "?consultarmaquina=" + id);
  }
  actualizarMaquina(id: any, datosMaquina: Maquina): Observable<any> {
    return this.clientService.post(this.API + "?actualizarv2=" + id, datosMaquina);
  }

}
