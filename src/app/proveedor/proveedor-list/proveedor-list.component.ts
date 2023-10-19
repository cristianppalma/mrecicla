import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent {

  constructor(private router:Router) {}

  crearProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorCreate');
  }

}
