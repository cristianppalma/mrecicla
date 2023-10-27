import { Component } from '@angular/core';


interface puesto {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent {

  
  puestos: puesto[] = [
    {value: 'Operador-costura-0', viewValue: ' Operador de costura circular'},
    {value: 'Supervisor-1', viewValue: 'Supervisor'},
    {value: 'Mecanico-2', viewValue: 'Mecanico GRAL'},
    {value: 'Hilador-2', viewValue: 'Hilador'},
  ];
}
