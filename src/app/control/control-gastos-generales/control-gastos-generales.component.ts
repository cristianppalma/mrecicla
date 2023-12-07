import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'
import { ControlService } from '../control.service';
import { PeriodicElement } from '../PeriodicElement';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control-gastos-generales',
  templateUrl: './control-gastos-generales.component.html',
  styleUrls: ['./control-gastos-generales.component.css']
})

export class ControlGastosGeneralesComponent  implements OnInit {

  Gastos: PeriodicElement[] = [];
  // displayedColumns: string[] = ['idControl','Concepto', 'Descripcion', 'Periodo', 'UsuarioCreador','FechaCreacion','UsuarioActualizar', 'FechaActualizacion', 'Monto','Tipo','action'];
  displayedColumns: string[] = ['idGastosFabrica','Concepto', 'Descripcion', 'Periodo', 'Monto','Tipo', 'UsuarioCreador','FechaCreacion','UsuarioActualizador', 'FechaActualizacion','action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

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
    console.log('Detalles de:', element);
    const idGastosFabrica = element.idGastosFabrica;
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/control/controlGastosGeneralesEditar/${idGastosFabrica}`);
  }

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private ControlService:ControlService
  ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    }

  CrearGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGeneralesCrear');
  }

  eliminarElemento(element: PeriodicElement): void {
    const index = this.dataSource.data.indexOf(element);

    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
    }
  }

  eliminarElemento2(element: PeriodicElement): void{
    const correoSave = this.ControlService.getCorreo();
    const index = this.dataSource.data.indexOf (element);
    const usuarioElimina=correoSave;
    if(index >=0){
      const idControl = element.idGastosFabrica;
      this.dataSource.data.splice(index,1);
      this.ControlService.eliminargasto(idControl, usuarioElimina).subscribe();
      this.dataSource._updateChangeSubscription();
      console.log(`Elemento eliminado en el índice ${index}, ID de la gasto: ${idControl}`);
    }
  }

  mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento(element);
      }
    });
  }

  mostrarDialogDeConfirmacion2(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento2(element);
      }
    });
  }

  ngOnInit(): void {
    this.ControlService.listarGastos().subscribe((respuesta: PeriodicElement[]) => {
    console.log(respuesta);
    this.Gastos = respuesta;
    this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });
  }

  RegresarGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastos');
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
