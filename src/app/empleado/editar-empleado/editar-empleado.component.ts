import { Component } from '@angular/core';
interface puesto {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent {

  puestos: puesto[] = [
    {value: 'Operador-costura-0', viewValue: ' Operador de costura circular'},
    {value: 'Supervisor-1', viewValue: 'Supervisor'},
    {value: 'Mecanico-2', viewValue: 'Mecanico GRAL'},
    {value: 'Hilador-2', viewValue: 'Hilador'},
  ];
}



