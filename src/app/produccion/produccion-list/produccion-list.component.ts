import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-produccion-list',
  templateUrl: './produccion-list.component.html',
  styleUrls: ['./produccion-list.component.css']
})
export class ProduccionListComponent {
  constructor(private router:Router) {}

  CrearProduccion (){
    this.router.navigateByUrl('/dashboard/produccion/produccionCreate');
  }
  RegresarProduccion (){
    this.router.navigateByUrl('/dashboard/produccion/produccion');
  }
}
