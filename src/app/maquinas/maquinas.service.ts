import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from './maquina';
import { PeriodicElement } from './PeriodicElement';

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {
  API: string = 'http://localhost/PhpAngular/';

  constructor( private clientService:HttpClient) { }

  agregarMaquina(datosMaquina:Maquina):Observable<any>{
    return this.clientService.post(this.API+"?insertarr=1",datosMaquina);
  }

 // listarMaquina(){
   // return this.clientService.get(this.API);
   //}

   listarMaquina(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API);
  }
}
