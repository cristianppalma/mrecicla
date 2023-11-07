import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';



@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  formularioEditarEmpleado: FormGroup;
  idEmpleado: any;

  constructor(
    private editarEmpleado: EmpleadoService,
    private FormBuilder: FormBuilder,
    private activateRoute : ActivatedRoute,
    private dialog: MatDialog, 
    private router: Router,


    ) {
      this.formularioEditarEmpleado =this.FormBuilder.group({
        Nombre:['', [Validators.required]],
        ApellidoPaterno: ['', [Validators.required]],
        Correo:['', [Validators.required]],
        Pass:['', [Validators.required]],
        ApellidoMaterno:['', [Validators.required]],
        Turno:['', [Validators.required]],
        Sueldo:['', [Validators.required]],
        Area :[''],
        Puesto:[''],
        Domicilio:['']
      });

      this.activateRoute.paramMap.subscribe((params) =>{
        this.idEmpleado = params.get('id'); 
        this.editarEmpleado.EditarEmpleado(this.idEmpleado).subscribe((respuesta=>{
        
           this.formularioEditarEmpleado.setValue({
            Nombre: respuesta.Nombre,
            ApellidoPaterno: respuesta.ApellidoPaterno,
            Correo: respuesta.Correo,
            Pass: respuesta.Pass,
            ApellidoMaterno: respuesta.ApellidoMaterno,
            Turno: respuesta.Turno,
            Sueldo: respuesta.Sueldo,
            Area: respuesta.Area,
            Puesto: respuesta.Puesto,
            Domicilio: respuesta.Domicilio,
           }); 
         } ))

      })
     }


     enviarDatos(): void {
      if (this.formularioEditarEmpleado.valid) {
        console.log('Se presionó el botón');
        console.log(this.formularioEditarEmpleado.value);
        this.editarEmpleado.UpdateEmpleado(this.formularioEditarEmpleado.value,this.idEmpleado).subscribe(
          (response) => {
           console.log('Se registro correctamente');
           this.mostratDialogoAviso();
            
            
          },
          (error) => {
            console.log('Aqui trono');
  
            // Manejar errores del servicio aquí
          }
        );
      }
    }
    mostratDialogoAviso():void{
      console.log('Tumadre');
      const dialogAviso = this.dialog.open(AvisoDialogComponent,{
        data: {message: 'Se Actualizo correctamente el Empleado'}
      });
      dialogAviso.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/dashboard/empleado/listEmp');
        }
      });
    
    }
  
    ngOnInit(): void {
    
    }
    
}



