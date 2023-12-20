import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto } from './producto';
import { producto2 } from './Producto2';
import { PeriodicElement } from './PeriodicElement';
import { PeriodicElement2 } from './PeriodicElement2';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  //API: string = 'https://recicladora.arvispace.com/PhpAngular/inventario/'
  //URL: string = 'https://recicladora.arvispace.com/PhpAngular/inventario/'
  private correo: string;
  private nombre: string;
  API: string = 'http://localhost/PhpAngular/inventario/';
  URL: string = 'http://localhost/PhpAngular/inventario/';


  constructor( private clientService:HttpClient) { }

  agregarProducto(datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?insertarInventarioInsumosPro=1",datosProducto);
  }

  listarInventario(): Observable<PeriodicElement[]> {
    return this.clientService.get<PeriodicElement[]>(this.API+"?ObtenerInventarioGeneral=1");
  }

/*  borrarInventario(id:any):Observable<any>{
    return this.clientService.delete(this.API+"?borrarInventario="+id);
  }*/

  //Borrar con procedimientos curi

  borrarInventario(id:any,usuarioEliminador: any):Observable<any>{
    return this.clientService.delete(`${this.API}?BorrarInventario=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }
  //Actualizar y consultar
  consultarInventario(id:any): Observable<PeriodicElement> {
    return this.clientService.get<PeriodicElement>(this.API+"?=consultarinventarioPro"+id);
  }

  editarproducto(id:any, datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?ActualizarInventario="+id,datosProducto);
  }

  selectAreas(){
    return this.clientService.get<any[]>(this.API+"?selectArea")
  }

 selectProductos(){
 return this.clientService.get<any[]>(this.API+"?SelectProducto")
 }

 getProductIds(): Observable<number[]> {
  // Haz una solicitud HTTP para obtener solo los IDs de los productos desde la base de datos
  return this.clientService.get<any[]>(this.API+"?SelectId");
}

    // OBTENEMOS EL CORREO DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
    getCorreo(): string {
      return this.correo = localStorage.getItem("Correo") || '';
    }

    // OBTENEMOS EL NOMBRE DEL LOCALSTORAGE  A LA LISTA DE LOS REGISTROS
    getNombre(): string {
      return this.nombre = localStorage.getItem("Nombre") || '';
    }

    ConsultarInvent(p_idInventario: any) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let params = 'p_idInventario=' + p_idInventario;
      return this.clientService.post(this.URL + 'MostrarInventario.php', params, { headers });
    }

    actualizarPesoInv(Peso: any , idFabrica: any) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let params = 'Peso=' + Peso +
                   '&idFabrica=' + idFabrica;
      return this.clientService.post(this.URL + 'ActualizarPesoInv.php', params, { headers });
    }

    sumarAlInventario(p_ID: number, p_cantidad: number): Observable<any> {
      const body = { p_ID, p_cantidad };
      return this.clientService.post(`${this.URL}/sumarInventario`, body);
    }


    ConsultarInv(p_idInventario: any) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let params = 'p_idInventario=' + p_idInventario;
      return this.clientService.post(this.URL + 'MostrarInventarioPorID.php', params, { headers });
    }
}


