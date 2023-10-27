import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'

interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  
  position: string;
  name: string;
  weight: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Hilos', name: 'Área encargada de generar hilos', weight: 'Activo', action: 'Ver detalles' },
  { position: 'Telar', name: 'Área encargada de generar telas', weight:'Activo' , action: 'Ver detalles' },
  { position: 'Imprenta', name: 'Área encargada de generar impresiones', weight: 'Mantenimeinto' ,  action: 'Ver detalles' },
  // ... otros datos
];

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent {
  selectedArea: string = '';
  seEncontraronDatos: boolean = false;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Imprenta', viewValue: 'Imprenta'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element.name);
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl('/dashboard/areas/areasedit/:id');
  }
  constructor(private router:Router, private dialog: MatDialog) {}
  crearArea(){
    this.router.navigateByUrl('/dashboard/areas/areascreate');
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

}}