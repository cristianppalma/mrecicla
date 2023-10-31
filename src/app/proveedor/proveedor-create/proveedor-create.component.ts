import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css'],
})
export class ProveedorCreateComponent implements OnInit {
  formularioProveedor: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private dialog: MatDialog
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
    if (this.formularioProveedor.value) {
      console.log('Se presionó el botón');
      console.log(this.formularioProveedor.value);
      this.proveedorService.agregarProveedor(this.formularioProveedor.value).subscribe(
        (response) => {
          console.log('Hasta aqui todo bien');
         console.log('Se registro correctamente');


        },
        (error) => {
          // Manejar errores del servicio aquí
          console.log('ESTO ES UN ERROR');
          this.mostratDialogoAviso();

        }
      );
    }
  }
  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/proveedor/proveedores');
      }
    });

  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }
}


// SEPARACION DE LOGICA DEL COMPONENTE

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormBuilder} from '@angular/forms';
// import { ProveedorService } from '../proveedor.service';

// @Component({
//   selector: 'app-proveedor-create',
//   templateUrl: './proveedor-create.component.html',
//   styleUrls: ['./proveedor-create.component.css']
// })
// export class ProveedorCreateComponent {

//   formularioDeProveedores:FormGroup;

//   constructor(
//     public formulario:FormBuilder,
//     private proveedorService:ProveedorService,
//     private router: Router
//     ) {

//       this.formularioDeProveedores = this.formulario.group({
//         name_proveedor:[''],
//         producto_proveedor:[''],
//         direccion_proveedor:[''],
//         rfc_proveedor:[''],
//         description_proveedor:[''],
//       });
//     }

//     enviarDatos():any{
//       console.log("Me presionaste");
//       console.log(this.formularioDeProveedores.value);

//       this.proveedorService.agregarProveedor(this.formularioDeProveedores.value).subscribe(respuesta=>{
//         this.router.navigateByUrl('/dashboard/proveedor/proveedores');
//       })
//     }

//   proveedores(){
//     this.router.navigateByUrl('/dashboard/proveedor/proveedores');
//   }

// }
