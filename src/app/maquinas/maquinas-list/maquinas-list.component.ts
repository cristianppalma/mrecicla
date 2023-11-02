import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'
import { MaquinasService } from '../maquinas.service';
import { PeriodicElement } from '../PeriodicElement';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.css']
})


export class MaquinasListComponent  implements OnInit {
  Maquina: PeriodicElement[] = [];
  displayedColumns: string[] = ['idMaquina','Serie', 'Numero', 'Modelo', 'Descripcion', 'Estado','Area','action'];
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
    console.log('Detalles de:');
    // Puedes abrir un modal, mostrar información adicional, etc.
    const idMaquina = element.idMaquina; // Obtener el ID de la máquina
    this.router.navigateByUrl(`/dashboard/maquinas/maquinaseditar/${idMaquina}`);
  }

  constructor(private router:Router,
              private dialog: MatDialog,
              private MaquinaService:MaquinasService
     ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
     }
  crearMaquina(){
    this.router.navigateByUrl('/dashboard/maquinas/maquinascreate');
  }


  eliminarElemento(element: PeriodicElement): void {
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
    }
  }

  eliminarElemento2(element: PeriodicElement): void {
    const index = this.dataSource.data.indexOf(element);
  
    if (index >= 0) {
      const idMaquina = element.idMaquina;
      this.dataSource.data.splice(index, 1);
      this.MaquinaService.eliminarMaquina(idMaquina).subscribe();
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
      
      // Aquí tienes tanto el índice como el idMaquina
      console.log(`Elemento eliminado en el índice ${index}, ID de la máquina: ${idMaquina}`);
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

  mostrarDialogoDeConfirmacion2(element: PeriodicElement): void {
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
    this.MaquinaService.listarMaquina().subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      this.Maquina = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });
  }



}