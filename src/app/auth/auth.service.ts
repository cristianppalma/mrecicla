import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // API: string = 'https://recicladora.arvispace.com/PhpAngular/'

   API: string = 'http://localhost/PhpAngular/'

  // OBTENER rol de usuario
  // private isAuthenticate = false;
  // private userRole: string | null = null;

  constructor( private clientService:HttpClient) { }

  verUsuario(datosUsuario:usuario):Observable<any>{
    return this.clientService.post(this.API+"?login=",datosUsuario);
  }

}
