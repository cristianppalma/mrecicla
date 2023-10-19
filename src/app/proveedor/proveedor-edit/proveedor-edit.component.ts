import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.css']
})
export class ProveedorEditComponent {

  constructor(private router: Router) {}

  proveedores(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedores');
  }

}
