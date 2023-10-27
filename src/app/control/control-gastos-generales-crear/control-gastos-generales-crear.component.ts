import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-gastos-generales-crear',
  templateUrl: './control-gastos-generales-crear.component.html',
  styleUrls: ['./control-gastos-generales-crear.component.css']
})


export class ControlGastosGeneralesCrearComponent {

  constructor(private router:Router) {}
  GuardarGastosGeneralesCrear(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }

  CancelarGastosGeneralesCrear(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }
  
}
