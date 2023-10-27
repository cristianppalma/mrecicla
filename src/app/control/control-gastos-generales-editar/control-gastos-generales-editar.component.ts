import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-gastos-generales-editar',
  templateUrl: './control-gastos-generales-editar.component.html',
  styleUrls: ['./control-gastos-generales-editar.component.css']
})
export class ControlGastosGeneralesEditarComponent {
  constructor(private router:Router) {}

  GuardarGastosGeneralesEditar(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }

  CancelarGastosGeneralesEditar(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }
}
