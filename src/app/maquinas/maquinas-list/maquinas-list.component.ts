import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
  import { Router } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  
  position: string;
  name: number;
  weight: string;
  symbol: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'K897-5854W', name: 598, weight: 'Hilos', symbol: 'Activo', action: 'Ver detalles' },
  { position: 'Q978-6958L', name: 599, weight: 'Hilos', symbol: 'Activo', action: 'Ver detalles' },
  { position: 'W895-7863P', name: 600, weight: 'Hilos', symbol: 'Inactivo', action: 'Ver detalles' },
  {position: '748S-9672O', name:602, weight:'Telar', symbol: 'Activo', action: 'Ver detalles'}
  // ... otros datos
];
@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.css']
})


export class MaquinasListComponent {
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element.name);
    // Puedes abrir un modal, mostrar información adicional, etc.
  }
  constructor(private router:Router) {}
  crearMaquina(){
    this.router.navigateByUrl('/dashboard/maquinas/maquinascreate');
  }
}
