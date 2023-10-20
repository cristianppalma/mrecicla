import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-maquinas-create',
  templateUrl: './maquinas-create.component.html',
  styleUrls: ['./maquinas-create.component.css']
})
export class MaquinasCreateComponent {
  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];
  constructor(private router:Router) {}
  AGREGAR(){

  }
  CANCELAR(){
    
    this.router.navigateByUrl('/dashboard/maquinas/maquinas');
  }
}
