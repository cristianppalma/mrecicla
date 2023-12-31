import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InventarioSalidaService } from '../inventario-salida.service';
import { PeriodicElement2 } from '../PeriodicElement2';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';

import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-inventario-salida-catalogo',
  templateUrl: './inventario-salida-catalogo.component.html',
  styleUrls: ['./inventario-salida-catalogo.component.css']
})
export class InventarioSalidaCatalogoComponent implements OnInit{

  usuarioTienePermisoSuper: boolean;
  areas: any[] = [];
  ProductoSalida: PeriodicElement2[] = [];
  displayedColumns:string[];
  dataSource: MatTableDataSource<PeriodicElement2>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement2) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    const idProductosalida = element.idProductosalida;
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/inventario/inventarioEditSalida/${idProductosalida}`)
  }

  constructor(
    private router:Router,
    private dialog:MatDialog,
    private InventarioServiceSalida:InventarioSalidaService,
    private excelService:ExporterService
  )
  {
    this.dataSource=new MatTableDataSource<PeriodicElement2>([]);

    const nombreUsuarioTipo = this.InventarioServiceSalida.getTipoUsuario();
    this.usuarioTienePermisoSuper = this.verificarPermisosDelUsuarioSuper();

    if (nombreUsuarioTipo === "SuperAdministrador") {
      this.displayedColumns = [
        'idProductosalida',
        'nombreProducto',
        'calibre',
        'idArea',
        'Empresa'
      ];
    } else {
      this.displayedColumns = [
        'idProductosalida',
        'nombreProducto',
        'calibre',
        'idArea'
      ];
    }
  }

  private verificarPermisosDelUsuarioSuper(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ( (nombreUsuario === "SuperAdministrador")); // Ejemplo: el usuario con rol "SuperAdmin" tiene permiso
  }

  //Crear un nuevo Producto de inventario salida
  crearProductoSalida() {
    this.router.navigateByUrl('/dashboard/inventario/inventarioCrearSalida');
  }

  //Dialogo para confirmar si se elimina un registro
  mostrarDialogoDeConfirmacion(element: PeriodicElement2): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarInventarioSalida(element);
      }
    });
  }

  //Eliminar un registro
  eliminarInventarioSalida(element:PeriodicElement2): void{
    const correoSave = this.InventarioServiceSalida.getCorreo();
    const index =this.dataSource.data.indexOf(element);
    const usuarioElimina=correoSave;
    if(index >=0){
      const idProductosalida = element.idProductosalida;
      this.dataSource.data.splice(index,1);
      this.InventarioServiceSalida.borrarInventarioSalida(idProductosalida,usuarioElimina).subscribe();
      this.dataSource._updateChangeSubscription();

      // Aquí tienes tanto el índice como el idMaquina
      console.log(`Elemento eliminado en el índice ${index}, ID del producto: ${idProductosalida}`);
    }
  }

  //Obtener la lista del inventario salida
  ngOnInit(): void {
    this.InventarioServiceSalida.listarInventariosalida().subscribe((respuesta: PeriodicElement2[]) => {
      console.log('LISTA DE PRODUCTOS: ', respuesta);
      this.ProductoSalida = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

    //Obtener las areas
    this.InventarioServiceSalida.selectAreas().subscribe((data)=>{
      this.areas=data;
    })
  }

  //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-catalogo-inventario-produccion');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-catalogo-inventario-produccion');
  }

  //Obtenemos el nombre del area
  obtenerNombreArea(idArea: number): string {
    const area = this.areas.find(item => item.idArea === idArea);
    return area ? area.NombreArea : '';
  }

  //Regresar a la pagina anterior
  regresar (){
    this.router.navigateByUrl('/dashboard/catalogos');
  }

}
