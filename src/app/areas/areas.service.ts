import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Areas } from './areas';
import { areasList } from './areasList';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  API: string = 'http://localhost/PhpAngular/';
  constructor( private clientService:HttpClient) { }

  agregarArea(datosArea:Areas):Observable<any>{
    return this.clientService.post(this.API+"?insertarAreas=1",datosArea);
  }
  
  listarAreas(): Observable<areasList[]> {
    return this.clientService.get<areasList[]>(this.API+"?seleccionarAreas=1");
  }

  eliminarArea(id: any): Observable<any> {
    return this.clientService.delete(this.API + "?borrarArea=" + id);
  }

  consultarArea(id: any):Observable<any>{
    return this.clientService.get(this.API + "?consultarArea=" + id);
  }
  
  actualizarArea(id: any, datosArea: Areas): Observable<any> {
    return this.clientService.post(this.API + "?actualizarAreas=" + id, datosArea);
  }
  

}
