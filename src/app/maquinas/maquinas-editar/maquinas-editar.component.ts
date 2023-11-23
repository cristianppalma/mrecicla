import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaquinasService } from '../maquinas.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-maquinas-editar',
  templateUrl: './maquinas-editar.component.html',
  styleUrls: ['./maquinas-editar.component.css']
})
export class MaquinasEditarComponent implements OnInit {
  areas: any[]=[];
  formularioMaquina2: FormGroup;
  idRecibido: any;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private maquinasService: MaquinasService,
    private dialog: MatDialog
  ) {
    this.maquinasService.getAreas().subscribe((data) => {
      this.areas = data;
    });
    const correoSave = this.maquinasService.getCorreo();
    this.formularioMaquina2 = this.formBuilder.group({
      Numero: [''],
      Serie: [''],
      Modelo: [''],
      Descripcion: [''],
      Estado: [''],
      Area: [''],
      UsuarioActualizador: [correoSave],
    });

    this.activeRoute.paramMap.subscribe((params) => {
      this.idRecibido = params.get('id');
      console.log('ID Recibido:', this.idRecibido);
      this.maquinasService.consultarmaquina(this.idRecibido).subscribe(respuesta => {
        console.log('Respuesta del servicio:', respuesta);

        // Asegúrate de que respuesta sea un objeto JSON válido
        if (respuesta && typeof respuesta === 'object') {
          // Asegúrate de que los datos se serialicen como JSON válido
          try {
            this.formularioMaquina2.setValue({
              Serie: respuesta.Serie || '',
              Numero: respuesta.Numero || '',
              Modelo: respuesta.Modelo || '',
              Descripcion: respuesta.Descripcion || '',
              Estado: respuesta.Estado || '',
              Area: respuesta.Area.toString(),
              UsuarioActualizador: respuesta.UsuarioActualizador || correoSave
            });

            
          } catch (error) {
            console.error('Error al deserializar los datos JSON:', error);
          }
        } else {
          console.error('No se encontraron datos válidos para el ID proporcionado.');
          // Aquí puedes mostrar un mensaje de error al usuario o redirigir a una página de error.
        }
        
      });
     
    });
  }

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/maquinas/maquinas');
  }
  enviarDatos() {
    if (this.formularioMaquina2.valid) {
      console.log('Formulario:', this.formularioMaquina2.value);
      console.log('id rec', this.idRecibido);
      console.log('Datos que se enviarán:', this.formularioMaquina2.value);

     this.maquinasService.actualizarMaquina(this.idRecibido, this.formularioMaquina2.value).subscribe(
    (response) => {
        console.log('Respuesta del servidor:', response);

        if (response.success === 1) {
            console.log('La actualización fue exitosa');
            // Accede a los datos actualizados
            const maquinaActualizada = response.data;
            console.log('Datos de la máquina actualizada:', maquinaActualizada);

            this.mostrarDialogoAviso();
        } else {
            console.error('Error al actualizar la máquina:', response.error);
            // Manejar errores del servicio aquí
        }
    },
    (error) => {
        console.error('Error al actualizar la máquina con error:', error);
    }
);

    }
    
  }
  

  mostrarDialogoAviso(): void {
    const dialogAviso = this.dialog.open(AvisoDialogComponent, {
      data: { message: 'Se actualizó correctamente en la Base de Datos' }
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/maquinas/maquinas');
      }
    });
  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    const correoSave = this.maquinasService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.maquinasService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
  }
}
