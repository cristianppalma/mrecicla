import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ProveedorService } from '../proveedor.service';
import { PeriodicElement } from '../PeriodicElement';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})


export class ProveedorListComponent  implements OnInit {
  Proveedor: PeriodicElement[] = [];
  displayedColumns: string[] = ['id_proveedor','name_proveedor', 'producto_proveedor', 'direccion_proveedor', 'action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilo', viewValue: 'Hilo'},
    {value: 'Tela', viewValue: 'Tela'},
    {value: 'Borra', viewValue: 'Borra'},
  ];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl('/dashboard/proveedor/proveedorEdit/:id')
  }
  constructor(private router:Router,
     private dialog: MatDialog,
     private proveedorService:ProveedorService
     ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
     }
  crearProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorCreate');
  }
  eliminarElemento(element: PeriodicElement): void {
    const index = this.dataSource.data.indexOf(element);

    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
    }
  }
  mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('delete');
        // this.proveedorService.borrarProveedor(element).subscribe((respuesta)=>{
        //   this.Proveedores.splice();
          this.eliminarElemento(element);
        }
      //   )
      // }
    });
  }
  ngOnInit(): void {
    this.proveedorService.listarProveedor().subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      console.log('Obtenemos todos los registros');

      this.Proveedor = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });
  }


  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id_proveedor: string){
  //       const dialogRef = this.dialog.open(ModalDeleteComponent, {
  //         width: '550px',
  //         enterAnimationDuration,
  //         exitAnimationDuration,
  //       });
  //       dialogRef.afterClosed().subscribe(res => {
  //         console.log(res);
  //         if (res){
  //           console.log('delete');
  //           this.proveedorService.borrarProveedor(id_proveedor).subscribe((respuesta)=>{
  //             this.Proveedores.splice();
  //             window.location.reload();
  //           });
  //         }
  //       })
  //     }


}

// SEPARACION ENTRE LA LOGICA DEL COMPONENTE

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProveedorService } from '../proveedor.service';
// import { MatDialog} from '@angular/material/dialog';
// import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

// @Component({
//   selector: 'app-proveedor-list',
//   templateUrl: './proveedor-list.component.html',
//   styleUrls: ['./proveedor-list.component.css']
// })
// export class ProveedorListComponent implements OnInit {

//   Proveedores:any;

//   filtrarTabla = '';

//   constructor(
//     private router:Router,
//     private proveedorService:ProveedorService,
//     public modal:MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.proveedorService.obtenerProveedores().subscribe(respuesta=>{
//       console.log(respuesta);

//       this.Proveedores=respuesta;
//     });
//   }

//   // Modal para eliminar un registro
//   openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id_proveedor: string){
//     const dialogRef = this.modal.open(ModalDeleteComponent, {
//       width: '550px',
//       enterAnimationDuration,
//       exitAnimationDuration,
//     });
//     dialogRef.afterClosed().subscribe(res => {
//       console.log(res);
//       if (res){
//         console.log('delete');
//         this.proveedorService.borrarProveedor(id_proveedor).subscribe((respuesta)=>{
//           this.Proveedores.splice();
//           window.location.reload();
//         });
//       }
//     })
//   }

// }
