import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ProveedorService } from '../proveedor.service';
import { PeriodicElement } from '../PeriodicElement';

// interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})

export class ProveedorListComponent  implements OnInit {

  inventarioFabrica: any[];

  Proveedor: PeriodicElement[] = [];
  displayedColumns: string[] = [  'idProveedor',
                                  'NombreProveedor',
                                  'idInventarioFabrica',
                                  'DireccionProveedor',
                                  'Telefono',
                                  'Correo',
                                  'EstatusProveedor',
                                  'action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // foods: Food[] = [
  //   {value:'',viewValue:''},
  //   {value: 'Hilo', viewValue: 'Hilo'},
  //   {value: 'Tela', viewValue: 'Tela'},
  //   {value: 'Borra', viewValue: 'Borra'},
  // ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de: ', element);
    console.log('ID: ', element.idProveedor);
    console.log('NAME: ', element.NombreProveedor);
    console.log('PRODUCTO: ', element.idInventarioFabrica);
    console.log('DIRECCION: ', element.DireccionProveedor);
    console.log('TELEFONO: ', element.Telefono);
    console.log('CORREO: ', element.Correo);
    console.log('RFC: ', element.RFCProveedor);
    console.log('DESCRIPCION: ', element.DescripcionProveedor);
    console.log('ESTATUS: ', element.EstatusProveedor);

    // Puedes abrir un modal, mostrar información adicional, etc.
    const idProveedor = element.idProveedor; // Obtener el ID de la máquina
    this.router.navigateByUrl(`/dashboard/proveedor/proveedorEdit/${idProveedor}`);
  }

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private proveedorService:ProveedorService
  ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    }

  crearProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorCreate');
  }

  eliminarElemento2(element: PeriodicElement): void {
    const correoSave = this.proveedorService.getCorreo();
    const index = this.dataSource.data.indexOf(element);
    const usuarioElimina=correoSave
    if (index >= 0) {
      const idProveedor = element.idProveedor;
      this.dataSource.data.splice(index, 1);
      this.proveedorService.borrarProveedor(idProveedor, usuarioElimina).subscribe();
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla

      // Aquí tienes tanto el índice como el idMaquina
      console.log(`Elemento eliminado en el índice ${index}, ID del Proveedor: ${idProveedor}`);
    }
  }

  mostrarDialogoDeConfirmacion2(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: '¿Estás seguro de que deseas eliminar este registro?',
        message: 'Esta accion no podra revertirse' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento2(element);
      }
    });
  }

  ngOnInit(): void {
    this.proveedorService.listarProveedor().subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      console.log('Obtenemos todos los registros');

      this.Proveedor = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

    //
    this.proveedorService.selectInventarioFabrica().subscribe((data)=>{
      this.inventarioFabrica=data;
    })

  }

  obtenerNombreInsumo(idInventarioFabrica: number): string {
    const inventario = this.inventarioFabrica.find(item => item.idInventarioFabrica === idInventarioFabrica);
    return inventario ? inventario.NombreInsumo : '';
  }

  regresar (){
    if (window.history.length > 1) {
      // Si hay más de una página en el historial, regresa a la página anterior
      window.history.back();
    } else {
      // Si no hay más páginas en el historial, puedes redirigir a una página específica
      // o realizar alguna otra acción en su lugar.
      console.warn('No hay páginas anteriores en el historial.');
      // Puedes redirigir a otra página o realizar otra acción aquí
    }
  }

}
