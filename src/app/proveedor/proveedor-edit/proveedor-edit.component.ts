import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

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
    const correoSave = this.proveedorService.getCorreo();
    this.formularioProveedorEdit=this.formBuilder.group({
      NombreProveedor:[''],
      ProductoProveedor:[''],
      DireccionProveedor:[''],
      Telefono:[''],
      Correo:[''],
      RFCProveedor:[''],
      DescripcionProveedor:[''],
      EstatusProveedor: [''],
      UsuarioActualizador: [correoSave],
    });
    }

    ngOnInit(): any {

      console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
      const correoSave = this.proveedorService.getCorreo();
      console.log('Correo desde el localStorage: ', correoSave);

      console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
      const nombreSave = this.proveedorService.getNombre();
      console.log('Nombre desde el localStorage: ', nombreSave);


      this.elID=this.activatedRoute.snapshot.paramMap.get('id');
      console.log('OBTENEMOS EL ID: ', this.elID);
      this.proveedorService.obtenerProveedor(this.elID).subscribe(
        respuesta => {
          console.log('Respuesta del servicio',respuesta);
          // const proveedor = respuesta[0];
          // console.log('datos del proveedor ', proveedor);

            this.formularioProveedorEdit.setValue({
              NombreProveedor: respuesta.NombreProveedor,
              ProductoProveedor: respuesta.ProductoProveedor,
              DireccionProveedor: respuesta.DireccionProveedor,
              Telefono: respuesta.Telefono,
              Correo: respuesta.Correo,
              RFCProveedor: respuesta.RFCProveedor,
              DescripcionProveedor: respuesta.DescripcionProveedor,
              EstatusProveedor:respuesta.EstatusProveedor,
              UsuarioActualizador: respuesta.UsuarioActualizador || correoSave,
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
        console.log('Id recibido: ', this.elID);
        console.log('Datos que se enviaran: ', this.formularioProveedorEdit.value);

        this.proveedorService.editarProveedor(this.elID, this.formularioProveedorEdit.value).subscribe(
          (respuesta)=> {
            console.log('Respuesta del servidor: ', respuesta);

            if (respuesta.success === 1) {
              console.log('La actualización fue exitosa');
              // Accede a los datos actualizados
              const proveedorActualizado = respuesta.data;
              console.log('Datos del proveedor actualizado: ', proveedorActualizado);
              this.mostrarDialogoAviso();
            } else {
              console.error('Error al actualizar el proveedor: ', respuesta.error);
              // Manejar errores del servicio aquí
            }

          },
          (error) => {
            console.error('Error al actualizar el proveedor con error: ', error);
          }
        );
      }
    }

    mostrarDialogoAviso():void{
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
