import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API: string = 'http://localhost/PhpAngular/';

  constructor( private clientService:HttpClient) { }

  verUsuario(datosUsuario:usuario):Observable<any>{
    return this.clientService.post(this.API+"?login=1",datosUsuario);
  }
}