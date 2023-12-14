import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'
import { AreasService } from '../areas.service';
import { areasList } from '../areasList';

import { ExporterService } from 'src/app/services/exporter.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent implements OnInit {

  areas: areasList[] = [];
  displayedColumns: string[] = ['idArea','NombreArea','DescripcionArea', 'EstadoArea','action'];
  dataSource: MatTableDataSource<areasList>;

  selectedArea: string = '';
  seEncontraronDatos: boolean = false;

  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Imprenta', viewValue: 'Imprenta'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  verDetalles(element: areasList) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    // Puedes abrir un modal, mostrar información adicional, etc.
    const idArea = element.idArea;
    this.router.navigateByUrl(`/dashboard/areas/areasedit/${idArea}`);
  }
  constructor(private router:Router,
              private dialog: MatDialog,
              private areasService:AreasService,
              private excelService:ExporterService
              ) {
                 this.dataSource = new MatTableDataSource<areasList>([]);
                }


  crearArea(){
    this.router.navigateByUrl('/dashboard/areas/areascreate');
  }
  eliminarElemento(element: areasList): void {
   const correoSave = this.areasService.getCorreo();
    const index = this.dataSource.data.indexOf(element);

    if (index >= 0) {
      const idArea = element.idArea;
      this.dataSource.data.splice(index, 1);
      this.areasService.eliminarArea(idArea,correoSave).subscribe();
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla

      // Aquí tienes tanto el índice como el idMaquina
      console.log(`Elemento eliminado en el índice ${index}, ID del area: ${idArea}`);
    }
  }

  mostrarDialogoDeConfirmacion(element: areasList): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento(element);
      }
    });
  }

// Modifica la función applyFilter para aplicar el filtro en función de la opción seleccionada
aplicarFiltro() {
  console.log('selectedArea:', this.selectedArea);
  if (this.selectedArea) {
    this.dataSource.filter = this.selectedArea.trim().toLowerCase();
  } else {
    this.dataSource.filter = '';
  }

  // Comprueba si se encontraron datos después de aplicar el filtro
  this.seEncontraronDatos = this.dataSource.filteredData.length > 0;
  console.log('seEncontraronDatos:', this.seEncontraronDatos);

}
ngOnInit(): void {
  this.areasService.listarAreas().subscribe((respuesta: areasList[]) => {
    console.log(respuesta);
    this.areas = respuesta;
    this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
  });
}

//Exportar SIN filtros
exportarXLSX(): void {
  this.excelService.exportToExcel(this.dataSource.data, 'reporte-areas');
}

//Exportar CON filtros
exportarXLSXFilter(): void {
  this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-areas');
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
