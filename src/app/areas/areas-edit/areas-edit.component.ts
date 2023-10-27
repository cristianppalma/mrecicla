import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-areas-edit',
  templateUrl: './areas-edit.component.html',
  styleUrls: ['./areas-edit.component.css']
})
export class AreasEditComponent {
  constructor(private router:Router) {}
  AGREGAR(){

  }
  CANCELAR(){
    
    this.router.navigateByUrl('/dashboard/areas/areas');
}
}