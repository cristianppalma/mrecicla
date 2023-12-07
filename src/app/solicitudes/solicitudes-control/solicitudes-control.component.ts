import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodicElement } from '../PeriodicElement';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudesService } from '../solicitudes.service';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-solicitudes-control',
  templateUrl: './solicitudes-control.component.html',
  styleUrls: ['./solicitudes-control.component.css']
})
export class SolicitudesControlComponent implements OnInit{

  Solicitud:PeriodicElement[] = [];
  displayedColumns:string[] = ['idSolicitud','nombreProducto','Peso','Dimensiones','FechaPeticion','Calibre','idProveedor','Composicion','FechaRecepcion','Estado','action']
  dataSource: MatTableDataSource<PeriodicElement>;

  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    const idsolicitud =element.idSolicitud
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/solicitudes/SolicitudesEdit/${idsolicitud}`)
  }
constructor(private router:Router,
  private dialog:MatDialog,
  private SolicitudesService:SolicitudesService) {
    this.dataSource=new MatTableDataSource<PeriodicElement>([]);
  }



SolicitudCrear(){
  this.router.navigateByUrl('/dashboard/solicitudes/SolicitudesCrear');
}
borrarSolicitud(element:PeriodicElement): void{
  const index =this.dataSource.data.indexOf(element);

  if(index >=0){
    this.dataSource.data.splice(index,1);
    this.dataSource._updateChangeSubscription();
  }
}
BorrarSolicitud2(element:PeriodicElement): void{
  const correoSave = this.SolicitudesService.getCorreo();
  const index =this.dataSource.data.indexOf(element);

  if(index >=0){
    const idsolicitud = element.idSolicitud;
    this.dataSource.data.splice(index,1);
    this.SolicitudesService.borrarSolicitud(idsolicitud,correoSave).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.borrarSolicitud(element);
    }
  });
}
mostrarDialogoDeConfirmacion2(element: PeriodicElement): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.BorrarSolicitud2(element);
    }
  });
}

ngOnInit(): void {
  this.SolicitudesService.listarSolicitud().subscribe((respuesta: PeriodicElement[]) => {
    console.log(respuesta);
    this.Solicitud = respuesta;
    this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
  });
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
