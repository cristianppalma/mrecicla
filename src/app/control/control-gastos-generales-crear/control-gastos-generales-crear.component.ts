import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ControlService } from '../control.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-gastos-generales-crear',
  templateUrl: './control-gastos-generales-crear.component.html',
  styleUrls: ['./control-gastos-generales-crear.component.css']
})
export class ControlGastosGeneralesCrearComponent implements OnInit {
  areaNombre:  string | null;
  formularioGastos: FormGroup;
  empresas: any[]=[];
  areas:   any[]=[];
  maquina: any[]=[];
  servicio: any[]=[];
  idTemporal="";
  usuarioSupervisor:boolean;
  usuarioSuper:boolean;
  usuarioAdmin:boolean;
  public isMaquinaErrorVisible: boolean = false;
  public isTipoServicioErrorVisible: boolean = false;
  public tipoServicioVisible: boolean | null = null;
  public maquinaVisible: boolean | null = null;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ControlService: ControlService,
    private dialog: MatDialog
  ) {
    //this.formularioGastos.get('Area')?.disable();
  }
  private verificarPuestoUser(): boolean{
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((puesto === "Encargado de Área") ); 
  }

  private verificarPermisosDelUsuarioSuper(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ( (nombreUsuario === "SuperAdministrador" )); // Ejemplo: el usuario con rol "admin" tiene permiso
  }
  
  private verificarPermisosDeladmin(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ( (nombreUsuario === "Administrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }

  CancelarGastosGeneralesCrear(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }

  mostrarDialogDeConfirmacion3(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas cancelar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  }

  enviarDatos(): void {
    console.log('Enviando datos...');
    this.actualizarVisibilidadmaquina(); //
    if(this.isMaquinaVisible()){
      console.log('Es visilble');
      const maquinaControl = this.formularioGastos.get('Maquina');
      if (maquinaControl) {
       
        maquinaControl.setValidators([this.maquinaRequeridaValidator]);
        maquinaControl.updateValueAndValidity();
      }
    
    if (this.formularioGastos.valid) {
      console.log('Se presionó el botón');
      console.log('Formulario válido');
      console.log(this.formularioGastos.value);
      this.ControlService.agregargasto(this.formularioGastos.value).subscribe(
        (response) => {
         console.log('Respuesta del servidor: ', response);

        if (response.success === 1) {
          console.log('Se registro correctamente');
          this.mostratDialogoAviso();
        } else {
          console.error('Error al registrar en la Base de Datos', response.error);
          this.mostrarDialogError();
        }
        },
        (error) => {
          // Manejar errores del servicio aquí
          this.mostrarDialogError();
        }
      );
    }else{
      console.log('Formulario no válido');
      console.log(this.formularioGastos.value);
    }
  }
  else
    {
      console.log('no es visible');
      if (this.formularioGastos.valid) {
        console.log('Se presionó el botón');
        console.log('Formulario válido');
        console.log(this.formularioGastos.value);
        this.ControlService.agregargasto(this.formularioGastos.value).subscribe(
          (response) => {
           console.log('Respuesta del servidor: ', response);
          if (response.success === 1) {
            console.log('Se registro correctamente');
            this.mostratDialogoAviso();
          } else {
            console.error('Error al registrar en la Base de Datos', response.error);
            this.mostrarDialogError();
          }
          },
          (error) => {
            // Manejar errores del servicio aquí
            this.mostrarDialogError();
          }
        );
      }else{
        console.log('Formulario no válido');
        console.log('No se pudieron cargar los datos...')
        console.log(this.formularioGastos.value);
      }
    }
  }

  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  }
  
  mostrarDialogError(): void {
    const dialogAviso = this.dialog.open(AvisoErrorComponent, {
        data: { message: 'Hubo un error al registrar en la Base de Datos' }
    });
    dialogAviso.afterClosed().subscribe(result => {
        if (result) {
            // Puedes realizar alguna acción adicional si es necesario
        }
    });
  }


  ngOnInit(): void {
 
    this.usuarioSupervisor = this.verificarPuestoUser();
    this.usuarioSuper = this.verificarPermisosDelUsuarioSuper();
    this.usuarioAdmin = this.verificarPermisosDeladmin();
    this.areaNombre = localStorage.getItem("NombreArea");
    const idFabrica = this.ControlService.getidFabrica();
    const correoSave2 = this.ControlService.getCorreo();
    const idAreaUser = this.ControlService.getidArea();
    const areaname = this.ControlService.getArea();
    this.formularioGastos = this.formBuilder.group({
      Concepto: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
      Periodo: ['', [Validators.required]],
      Monto:['', [Validators.required, this.noNegativoValidator]],
      Tipo:['', [Validators.required]],
      Area: [idAreaUser || ''],
      Maquina: [''],
      UsuarioCreador:[correoSave2],
      Fabrica: [idFabrica],
      areaNombre:[areaname],
      TipoServicio:[''],
     
    });
    //this.formularioGastos.get('Maquina')?.disable();
    //this.formularioGastos.get('TipoServicio')?.disable();
    console.log('ID: ', this.areaNombre);
    console.log('AQUI ABAJO SE MOSTRARIA EL idArea QUE SE TRAE DESDE EL LOCALSTORAGE');
    const idArea = this.ControlService.getidArea();
    console.log('Nombre desde el localStorage: ', idArea);

    this.ControlService.getAreas().subscribe((data) => {
      this.areas = data;
      //this.formularioGastos.get('Area')?.disable();
    });
 
    // TRAEMOS EL CORREO DESDE EL SERVICIO
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.ControlService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);
    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.ControlService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
    
    this.areaNombre = localStorage.getItem("NombreArea");
    console.log('ID: ', this.areaNombre);
    console.log('Nombre desde el localStorage: ', idArea);
  

  
    // Verifica que usuarioSupervisor tenga el valor correcto
    console.log('Valor de usuarioSupervisor:', this.usuarioSupervisor);


    this.ControlService.getEmpresas().subscribe((data2) => {
      this.empresas = data2;
    });

    this.ControlService.getServicio().subscribe((data2) =>{
      this.servicio = data2;
    });
    
   
    if (this.usuarioSupervisor) {
      // Encargado de Área
      this.ControlService.getMaquinas(idArea).subscribe((data2) => {
        this.maquina = data2;
      });
    } else if (this.usuarioAdmin || this.usuarioSuper) {
      // Administrador o SuperAdministrador
      this.ControlService.getmaquinaria().subscribe((data1) => {
        this.maquina = data1;
      });
    }

    this.formularioGastos.get('Tipo')?.valueChanges.subscribe(() => {
      this.actualizarVisibilidadmaquina();
    });
 

  }
 
  llenardatos(event: any) {
    this.idTemporal = event.value;
    this.actualizarVisibilidadmaquina();
    this.ControlService.getservicioMaquina(event.value).subscribe((data: any) => {
        if (data !== 201) {
            console.log(data);

            // Limpiar el array de servicios antes de agregar nuevos elementos
            this.servicio = [];

            data.forEach((element: any) => {
                console.log(element.Peso);
                console.log(element.Fecha);

                // Agregar cada elemento al array de servicios
                this.servicio.push({
                    idServicio: element.idServicio,
                    NombreServicio: element.NombreServicio
                });
            });
        }
    }, (err) => {
        console.log(err);
    });
}
noNegativoValidator(control: AbstractControl) {
  const value = control.value;

  if (value < 0) {
    return {
      noNegativo: true
    };
  }

  return null;
}

public isMaquinaDisabled(): boolean {
  const maquinaControl = this.formularioGastos.get('Maquina') as FormControl;
  const tipoControl = this.formularioGastos.get('Tipo') as FormControl;

  // Verificar las condiciones para deshabilitar el campo dinámicamente
  return !(tipoControl?.value === 'Gasto Maquinaria' || tipoControl?.value === 'Gasto Servicios');
}

/*maquinaRequeridaValidator(control: AbstractControl) {
  const maquinaValue = control.value;
  // Verificar si el valor es nulo o cadena vacía
  if (maquinaValue === null || maquinaValue === '') {
    return {
      maquinaRequerida: true
    };
  }
  return null;  // No hay error si el campo tiene un valor
}
*/

maquinaRequeridaValidator(control: AbstractControl) {
  const maquinaValue = control.value;

  // Verificar si el valor es nulo o cadena vacía
  if (maquinaValue !== null && maquinaValue !== '') {
    return null;  // No hay error si el campo tiene un valor
  }
  
  // Devuelve el error solo si Maquina no es null ni una cadena no vacía
  return {
    maquinaRequerida: true
  };
}

public isMaquinaVisible(): boolean {
  const tipoControl = this.formularioGastos.get('Tipo') as FormControl;
  const maquinaControl = this.formularioGastos.get('Maquina') as FormControl;

  // Verificar las condiciones para mostrar el campo dinámicamente
  const isVisible = tipoControl?.value === 'Gasto Maquinaria' || tipoControl?.value === 'Gasto Servicios';

  return isVisible;
}

public isTipoServicioVisible(): boolean | null {
  const tipoControl = this.formularioGastos.get('Tipo') as FormControl;
  const maquinaControl = this.formularioGastos.get('Maquina') as FormControl;

  const isTipoServiciosSelected = tipoControl?.value === 'Gasto Servicios';
  const isMaquinaSelected = maquinaControl?.value !== null && maquinaControl?.value !== '';

  return isTipoServiciosSelected && isMaquinaSelected ? true : null;
}


public actualizarVisibilidad(): void {
  this.tipoServicioVisible = this.isTipoServicioVisible();
  // Si el tipo de servicio no es visible, restablecer el formulario
  if (!this.tipoServicioVisible) {
    this.formularioGastos.get('TipoServicio')?.reset();
  }
}

public actualizarVisibilidadmaquina(): void {
  this.maquinaVisible = this.isMaquinaVisible();

  // Si el tipo de servicio no es visible o Maquina no es visible, establecer el valor de Maquina en null
  if (!this.maquinaVisible) {
    this.formularioGastos.get('Maquina')?.setValue(null);
  }
}


}