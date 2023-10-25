import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  position: string;
  name: String;
  weight: string;
  symbol: string;
  action: number;
  Fingreso: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [ //ya no se ocupa 
{ position: 'Gerado Lopez', name: 'Gerente', weight: 'Hilos', symbol: 'M', action: 1000, Fingreso: new Date(2020, 9, 10) }, // los meses en JavaScript son 0-indexados, por lo que 9 es octubre.
{ position: 'Pancrasio Martinez', name: 'Operador de costura', weight: 'Hilos', symbol: 'M', action: 1000, Fingreso: new Date(2020, 9, 10) },
{ position: 'Alejando Magno', name: 'Recepcionista', weight: 'Hilos', symbol: 'B', action: 1500, Fingreso: new Date(2020, 9, 10) },
{position: 'Riracrdo Lopez', name:'Supervisor', weight:'Telar', symbol: 'N', action: 2500, Fingreso: new Date(2020, 9, 10) }
];

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class ListaEmpleadosComponent {
  
  // Datos originales (sin filtro)
  datos = [
    { position: 'Gerado L', name: 'Gerente', weight: 'Hilos', symbol: 'M', action: 1000, Fingreso: new Date(2020, 9, 10) }, // los meses en JavaScript son 0-indexados, por lo que 9 es octubre.
    { position: 'Pancrasio Martinez', name: 'Operador de costura', weight: 'Hilos', symbol: 'M', action: 1000, Fingreso: new Date(2020, 9, 10) },
    { position: 'Alejando Magno', name: 'Recepcionista', weight: 'Hilos', symbol: 'B', action: 1500, Fingreso: new Date(2020, 9, 10) },
    {position: 'Riracrdo Lopez', name:'Supervisor', weight:'Telar', symbol: 'N', action: 2500, Fingreso: new Date(2020, 9, 10) }
  ];

  // Datos que se mostrarán (pueden estar filtrados)
  datosMostrados = [...this.datos];

  // Objeto para los valores del filtro
  filter = {
    nombre: '',
    turno: '',
    area: '',
    puesto: '',
    sueldo: null
  };

  foods: Food[] = [
    { value: '', viewValue: '' },
    { value: 'Hilos', viewValue: 'Hilos' },
    // ... otros datos
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(this.datosMostrados);

  constructor(private router: Router) { }

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

  verDetalles(element: PeriodicElement) {
    console.log('Detalles de:', element.name);
  }

  crearMaquina() {
    this.router.navigateByUrl('/dashboard/maquinas/maquinascreate');
  }
}
