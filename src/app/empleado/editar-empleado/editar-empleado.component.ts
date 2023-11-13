import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { Areas } from 'src/app/areas/areas';


@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  formularioEditarEmpleado: FormGroup;
  idEmpleado: any;

  areas : any[]= [];
  puestos : any[]= [];
  tipoUsuarios : any[]= [];

  constructor(
    private editarEmpleado: EmpleadoService,
   
    private activateRoute : ActivatedRoute,
    private dialog: MatDialog, 
    private router: Router,


    ) {
  
      this.formularioEditarEmpleado = new FormGroup({
        practicante: new FormControl(''),
        Nombre: new FormControl('', [Validators.required]),
        ApellidoPaterno: new FormControl('', [Validators.required]),
        ApellidoMaterno: new FormControl('', [Validators.required]),
        Pass: new FormControl('', [Validators.required]),
        Puesto: new FormControl(''),
        Correo: new FormControl('', [Validators.required]),
        Turno : new FormControl(''),
        Area : new FormControl (''),
        Sueldo : new FormControl (''),
        Domicilio : new FormControl('', [Validators.required]),
        idTipoUsuario : new FormControl('')

      });

      this.activateRoute.paramMap.subscribe((params) => {
        this.idEmpleado = params.get('id');
        this.editarEmpleado.EditarEmpleado(this.idEmpleado).subscribe((respuesta) => {
          console.log(respuesta);
          this.formularioEditarEmpleado.patchValue({
            Nombre: respuesta.Nombre,
            ApellidoPaterno: respuesta.ApellidoPaterno,
            Correo: respuesta.Correo,
            Pass: respuesta.Pass,
            ApellidoMaterno: respuesta.ApellidoMaterno,
            Turno: respuesta.Turno,
            Sueldo: respuesta.Sueldo,
            Area: respuesta.idArea.toString(),
            Puesto: respuesta.idAsignacion.toString(),
            Domicilio: respuesta.Domicilio,
            idTipoUsuario : respuesta.idTipoUsuario.toString(),
            
          });
          this.formularioEditarEmpleado.controls['practicante'].setValue(respuesta.Practicante);

        });
      });
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

      this.formularioEditarEmpleado.controls['practicante'].valueChanges.subscribe(
        (practicante) => {
          if (practicante === 'no') {
            this.formularioEditarEmpleado.controls['Puesto'].enable();
            this.formularioEditarEmpleado.controls['Turno'].enable();
            this.formularioEditarEmpleado.controls['Area'].enable();
            this.formularioEditarEmpleado.controls['Sueldo'].enable();
          
          } else {
            this.formularioEditarEmpleado.controls['Puesto'].disable();
            this.formularioEditarEmpleado.controls['Turno'].disable();
            this.formularioEditarEmpleado.controls['Area'].disable();
            this.formularioEditarEmpleado.controls['Sueldo'].disable();
            
            this.formularioEditarEmpleado.controls['Puesto'].reset();
            this.formularioEditarEmpleado.controls['Turno'].reset();
            this.formularioEditarEmpleado.controls['Area'].reset();
            this.formularioEditarEmpleado.controls['Sueldo'].reset();
  
  
          }
        }
     
        );
      
      // Puedes realizar alguna inicialización adicional aquí si es necesario.
      this.editarEmpleado.SelectAreas().subscribe((data) => {
        this.areas=data;
      });
  
      this.editarEmpleado.SelectPuestos().subscribe((data) => {
        this.puestos=data;
      });
      
      this.editarEmpleado.SelectTipoUsuarios().subscribe((data) => {
        this.tipoUsuarios=data;
      });
    }
    
    
}



