import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css']
})
export class ProveedorCreateComponent {

  constructor(private router: Router) {}

  proveedores(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedores');
  }

}
