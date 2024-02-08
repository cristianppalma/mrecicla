import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Solicitud } from './solicitud.model';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://tu-backend.com/api'; // Reemplaza con la URL de tu backend

  // Observable para notificaciones
  notificacion = new Subject<Solicitud>();

  constructor(private http: HttpClient) { }

  // Método para enviar una solicitud al backend
  enviarSolicitud(solicitud: Solicitud) {
    return this.http.post(`${this.apiUrl}/enviar-solicitud`, solicitud);
  }

  // Método para obtener las solicitudes pendientes desde el backend
  getSolicitudesPendientes() {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes-pendientes`);
  }

  // Método para aceptar una solicitud
  aceptarSolicitud(solicitud: Solicitud) {
    // Implementa la lógica para aceptar la solicitud en el backend
    // ...

    // Notifica a los suscriptores sobre la actualización
    this.notificacion.next(solicitud);
  }

  // Método para declinar una solicitud
  declinarSolicitud(solicitud: Solicitud) {
    // Implementa la lógica para declinar la solicitud en el backend
    // ...

    // Notifica a los suscriptores sobre la actualización
    this.notificacion.next(solicitud);
  }
}
