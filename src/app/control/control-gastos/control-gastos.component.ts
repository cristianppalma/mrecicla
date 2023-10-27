import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-gastos',
  templateUrl: './control-gastos.component.html',
  styleUrls: ['./control-gastos.component.css']
})
export class ControlGastosComponent {
  constructor(private router:Router) {}

  VerGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }
}
