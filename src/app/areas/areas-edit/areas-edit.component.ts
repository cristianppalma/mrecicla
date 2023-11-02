import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, isFormGroup } from '@angular/forms';
import { AreasService } from '../areas.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';

@Component({
  selector: 'app-areas-edit',
  templateUrl: './areas-edit.component.html',
  styleUrls: ['./areas-edit.component.css']
})
export class AreasEditComponent  implements OnInit{
  formularioAreas: FormGroup;
  idRecibidoArea: any;


  constructor(
              private activeRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private areasService: AreasService,
              private dialog: MatDialog
            ) {
              this.formularioAreas = this.formBuilder.group({
                NombreArea: [''],
                DescripcionArea: [''],
                EstadoArea: ['']
            });

            this.activeRoute.paramMap.subscribe((params) => {
              this.idRecibidoArea = params.get('id');
              console.log('ID Recibido:', this.idRecibidoArea);
              this.areasService.consultarArea(this.idRecibidoArea).subscribe(respuesta => {
                console.log('Respuesta del servicio:', respuesta);
        
                // Asegúrate de que respuesta sea un objeto JSON válido
                if (respuesta && typeof respuesta === 'object') {
                  // Asegúrate de que los datos se serialicen como JSON válido
                  try {
                    this.formularioAreas.setValue({
                      NombreArea: respuesta.NombreArea || '',
                      DescripcionArea: respuesta.DescripcionArea || '',
                      EstadoArea: respuesta.EstadoArea ||''
                    });
                  } catch (error) {
                    console.error('Error al asignar los datos JSON:', error);
                  }
                } else {
                  console.error('No se encontraron datos válidos para el ID proporcionado.');
                  // Aquí puedes mostrar un mensaje de error al usuario o redirigir a una página de error.
                }
              });
            });
          }
  enviarDatosActualizar(){
    if (this.formularioAreas.valid) {
      console.log('Formulario:', this.formularioAreas.value);
      console.log('id rec', this.idRecibidoArea);
      console.log('Datos que se enviarán:', this.formularioAreas.value);

     this.areasService.actualizarArea(this.idRecibidoArea, this.formularioAreas.value).subscribe(
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
        this.router.navigateByUrl('/dashboard/areas/areas');
      }
    });
  }


  CANCELAR(){
    
    this.router.navigateByUrl('/dashboard/areas/areas');
}
ngOnInit(): void {
  // Puedes realizar alguna inicialización adicional aquí si es necesario.
}

}