import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private proveedorService:ProveedorService,
    private dialog: MatDialog
  ) {

    this.formularioProveedorEdit=this.formBuilder.group({
      name_proveedor:[''],
      producto_proveedor:[''],
      direccion_proveedor:[''],
      rfc_proveedor:[''],
      description_proveedor:['']
    });
    }

    ngOnInit(): any {

      this.elID=this.activatedRoute.snapshot.paramMap.get('id');
      console.log('OBTENEMOS EL ID: ', this.elID);
      this.proveedorService.obtenerProveedor(this.elID).subscribe(
        respuesta => {
          console.log('respuesta de la API',respuesta);
            const proveedor = respuesta[0];
            console.log('datos del proveedor ', proveedor);

            this.formularioProveedorEdit.setValue({
              name_proveedor: proveedor.name_proveedor,
              producto_proveedor: proveedor.producto_proveedor,
              direccion_proveedor: proveedor.direccion_proveedor,
              rfc_proveedor: proveedor.rfc_proveedor,
              description_proveedor: proveedor.description_proveedor
            });

        }, error => {
          console.error('ERROR DE LA SOLICITUD: ',error);
        }
      );
    }

    CANCELAR() {
      this.router.navigateByUrl('/dashboard/proveedor/proveedores');
    }

    enviarDatos(): void {
      if (this.formularioProveedorEdit.valid) {
        console.log(this.elID);
        console.log('Se presionó el botón');
        console.log(this.formularioProveedorEdit.value);
        this.proveedorService.editarProveedor(this.elID, this.formularioProveedorEdit.value).subscribe(
          (respuesta)=> {
            console.log('SALIO BIEN');
            this.mostratDialogoAviso();

          },
          (error) => {
            console.log('SALIO UN ERROR');
          }
        );
      }
    }

    mostratDialogoAviso():void{
      const dialogAviso = this.dialog.open(AvisoDialogComponent,{
        data: {message: 'Se actualizo correctamente en la Base de Datos'}
      });
      dialogAviso.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/dashboard/proveedor/proveedores');
        }
      });

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
