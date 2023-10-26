import { Component } from '@angular/core';
interface puesto {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent {
  
  puestos: puesto[] = [
    {value: 'Operador-costura-0', viewValue: ' Operador de costura circular'},
    {value: 'Supervisor-1', viewValue: 'Supervisor'},
    {value: 'Mecanico-2', viewValue: 'Mecanico GRAL'},
    {value: 'Hilador-2', viewValue: 'Hilador'},
  ];

}
