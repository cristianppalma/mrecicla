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
  private idFabricaUsuario: string;
  API: string = 'http://localhost/PhpAngular/inventario/actual/';
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
    return this.clientService.delete(`${this.API}?eliminarInventarioInsumo=${id}&UsuarioEliminador=${usuarioEliminador}`);
  }
  //Actualizar y consultar
  consultarInventario(id:any): Observable<any> {
    return this.clientService.get<PeriodicElement>(this.API+"?=obtenerProductoInsumoPorID="+id);
  }

  editarproducto(id:any, datosProducto:producto):Observable<any>{
    return this.clientService.post(this.API+"?actualizarProductoInsumo="+id,datosProducto);
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

    getIdFabricaUsuario(): string {
      return this.idFabricaUsuario = localStorage.getItem("idFabrica") || '';
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

    // sumarAlInventario(p_ID: any, p_cantidad: any): Observable<any> {
    //   const body = { p_ID, p_cantidad };
    //   return this.clientService.post(`${this.URL}/sumarInventario`, body);
    // }

    sumarAlInventario(p_ID: any, p_cantidad: any) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let params = 'p_ID=' + p_ID+'&p_cantidad='+p_cantidad;
      return this.clientService.post(this.URL + 'sumarInventario.php', params, { headers });
    }



    ConsultarInv(p_idInventario: any) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let params = 'p_idInventario=' + p_idInventario;
      return this.clientService.post(this.URL + 'MostrarInventarioPorID.php', params, { headers });
    }

    consultarDatosInventario() {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let params = 'xrsxryw1y21';
      return this.clientService.post(this.URL + 'MostrarDatosInventario.php', params, { headers });
    }
}


