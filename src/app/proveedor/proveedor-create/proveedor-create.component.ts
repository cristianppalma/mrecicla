import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css']
})
export class ProveedorCreateComponent {

  formularioDeProveedores:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private proveedorService:ProveedorService,
    private router: Router
    ) {

      this.formularioDeProveedores = this.formulario.group({
        name_proveedor:[''],
        producto_proveedor:[''],
        direccion_proveedor:[''],
        rfc_proveedor:[''],
        description_proveedor:[''],
      });
    }

    enviarDatos():any{
      console.log("Me presionaste");
      console.log(this.formularioDeProveedores.value);

      this.proveedorService.agregarProveedor(this.formularioDeProveedores.value).subscribe(respuesta=>{
        this.router.navigateByUrl('/dashboard/proveedor/proveedores');
      })
    }

  proveedores(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedores');
  }

}
