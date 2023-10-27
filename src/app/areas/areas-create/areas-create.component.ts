import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-create',
  templateUrl: './areas-create.component.html',
  styleUrls: ['./areas-create.component.css']
})
export class AreasCreateComponent {
  constructor(private router:Router) {}
  AGREGAR(){

  }
  CANCELAR(){
    
    this.router.navigateByUrl('/dashboard/areas/areas');
  }
}
