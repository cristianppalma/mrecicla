import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.css']
})
export class ProveedorEditComponent implements OnInit {
  formularioProveedor: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.formularioProveedor = this.formBuilder.group({
      name_proveedor: ['', [Validators.required]],
      producto_proveedor: [''],
      direccion_proveedor: [''],
      rfc_proveedor: [''],
      description_proveedor: [''],
    });
  }


  CANCELAR() {
    this.router.navigateByUrl('/dashboard/proveedor/proveedores');
  }
  enviarDatos(): void {
    if (this.formularioProveedor.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioProveedor.value);
      this.proveedorService.agregarProveedor(this.formularioProveedor.value).subscribe(
        (response) => {
          // Manejar la respuesta del servicio aquí
        },
        (error) => {
          // Manejar errores del servicio aquí
        }
      );
    }
  }


  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }
}


// SEPARACION DE LA LOGICA

// import { Component } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormBuilder} from '@angular/forms';
// import { ProveedorService } from '../proveedor.service';

// @Component({
//   selector: 'app-proveedor-edit',
//   templateUrl: './proveedor-edit.component.html',
//   styleUrls: ['./proveedor-edit.component.css']
// })
// export class ProveedorEditComponent {

//   formularioDeProveedores:FormGroup;
//   elID:any;

//   constructor(
//     private activatedRoute:ActivatedRoute,
//     private router: Router,
//     private proveedorService:ProveedorService,
//     public formulario:FormBuilder
//     ) {
//       this.elID=this.activatedRoute.snapshot.paramMap.get('id');
//     console.log(this.elID);
//     this.proveedorService.obtenerProveedor(this.elID).subscribe(
//       respuesta=> {
//         console.log(respuesta);
//         this.formularioDeProveedores.setValue({
//           name_proveedor:respuesta[0]['name_proveedor'],
//           producto_proveedor:respuesta[0]['producto_proveedor'],
//           direccion_proveedor:respuesta[0]['direccion_proveedor'],
//           rfc_proveedor:respuesta[0]['rfc_proveedor'],
//           description_proveedor:respuesta[0]['description_proveedor']
//         })
//       }
//     );
//     this.formularioDeProveedores=this.formulario.group({
//       name_proveedor:[''],
//       producto_proveedor:[''],
//       direccion_proveedor:[''],
//       rfc_proveedor:[''],
//       description_proveedor:['']
//     });
//     }

//     enviarDatos():any {
//       console.log(this.elID);
//       console.log(this.formularioDeProveedores.value);

//       this.proveedorService.editarProveedor(this.elID, this.formularioDeProveedores.value).subscribe(()=>{
//         this.router.navigateByUrl('/dashboard/proveedor/proveedores');
//       });
//     }

//   proveedores(){
//     this.router.navigateByUrl('/dashboard/proveedor/proveedores');
//   }

// }
