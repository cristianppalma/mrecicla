import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-control-gastos-generales',
  templateUrl: './control-gastos-generales.component.html',
  styleUrls: ['./control-gastos-generales.component.css']
})
export class ControlGastosGeneralesComponent {
  constructor(private router:Router) {}

  CrearGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGeneralesCrear');
  }

  EditarGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGeneralesEditar');
  }
  RegresarGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastos');
  }

   /* curi ts */

   formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  displayedColumns: string[] = ['concepto', 'descripcion', 'periodo', 'usuario','fechacreacion','usuarioactualizar', 'fechaactualizacion', 'monto', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element.concepto);
    console.log('Detalles de:', element.descripcion);
    // Puedes abrir un modal, mostrar información adicional, etc.
  }
}
  /* curi ts */
  export interface PeriodicElement {
    
    concepto: string;
    descripcion: string;
    periodo: string;
    usuario: string;
    fechacreacion: string;
    usuarioactualizar:string;
    fechaactualizar:string;
    action: string;
    monto: number;
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    { concepto: 'Luz', descripcion: 'Pago de Servicio', periodo: 'Septiembre', usuario: '', fechacreacion:'10/09/2023', usuarioactualizar: '', fechaactualizar: '', monto: 2500 , action: 'Ver detalles' },
    { concepto: 'Agua', descripcion: 'Pago de Servicio', periodo: 'Septiembre', usuario: '',fechacreacion:'10/09/2023', usuarioactualizar: '', fechaactualizar: '', monto: 2000 , action: 'Ver detalles' },
    { concepto: 'Algodon', descripcion: 'Pago de Producto', periodo: 'Octubre', usuario: '',fechacreacion:'08/10/2023', usuarioactualizar: '', fechaactualizar: '', monto: 8000 , action: 'Ver detalles' },
    {concepto: 'Hilo', descripcion:'Pago de Producto', periodo:'Octubre', usuario: '',fechacreacion:'08/10/2023', usuarioactualizar: '', fechaactualizar: '', monto: 8000 , action: 'Ver detalles'},
    {concepto: 'Poliester', descripcion:'Pago de Producto', periodo:'Octubre', usuario: '',fechacreacion:'08/10/2023', usuarioactualizar: '', fechaactualizar: '',monto: 8000 , action: 'Ver detalles'}
    // ... otros datos
  ];