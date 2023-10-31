import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.css']
})
export class ProveedorEditComponent implements OnInit {
  formularioProveedorEdit: FormGroup;
  elID:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private proveedorService:ProveedorService
  ) {

    this.formularioProveedorEdit = this.formBuilder.group({
      name_proveedor: [''],
      producto_proveedor: [''],
      direccion_proveedor: [''],
      rfc_proveedor: [''],
      description_proveedor: ['']
    });


    this.activatedRoute.paramMap.subscribe((params) =>{
      this.elID = params.get('id');
      console.log('ID recibido: ', this.elID);

      this.proveedorService.obtenerProveedor(this.elID).subscribe(respuesta => {
        console.log('Respuesta del servicio: ', respuesta);

        if(respuesta && respuesta.name_proveedor) {
          this.formularioProveedorEdit.setValue({
            name_proveedor: respuesta.name_proveedor,
            producto_proveedor: respuesta.producto_proveedor,
            direccion_proveedor: respuesta.direccion_proveedor,
            rfc_proveedor: respuesta.rfc_proveedor,
            description_proveedor: respuesta.description_proveedor
          });
        } else {
          console.error('No existe el id');
          // Mensaje de error
        }
      });
    });
  }

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/proveedor/proveedores');
  }
  enviarDatos(): void {
      console.log(this.elID);
      console.log('Se presionó el botón');
      console.log(this.formularioProveedorEdit.value);
      this.proveedorService.editarProveedor(this.elID, this.formularioProveedorEdit.value).subscribe(
        ()=> {
          this.router.navigateByUrl('/dashboard/proveedor/proveedores');
        }
      );
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
