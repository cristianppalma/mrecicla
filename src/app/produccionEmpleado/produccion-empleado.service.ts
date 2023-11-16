import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './PeriodicElement';
import { Produccion } from './produccion';

@Injectable({
  providedIn: 'root'
})
export class ProduccionEmpleadoService {

  API: string = 'http://localhost/PhpAngular/produccionarea/';

  constructor(
    private clientService: HttpClient
  ) { }

  listarProduccionArea(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API);
  }

  agregarProduccionArea(datosProduccionArea:Produccion):Observable<any>{
    return this.clientService.post(this.API+"?insertarProduccionArea=1",datosProduccionArea);
  }

  verDetallesProduccionArea(idProduccionArea:string): Observable<any> {
    return this.clientService.get(this.API+"?consultarProduccionArea="+idProduccionArea);
  }

}
