import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produccion } from './produccion';

@Injectable({
  providedIn: 'root'
})
export class ProduccionEmpleadoService {

  API: string = 'http://localhost/PhpAngular/produccionArea/';

  constructor(
    private clientService: HttpClient
  ) { }

  listarProduccionArea(): Observable<Produccion[]> {
    return this.clientService.get<Produccion[]>(this.API+"?seleccionar=1");
  }

  verDetallesProduccionArea(idProduccionArea:string): Observable<Produccion> {
    return this.clientService.get<Produccion>(this.API+"?editarProduccionArea="+idProduccionArea);
  }
}
