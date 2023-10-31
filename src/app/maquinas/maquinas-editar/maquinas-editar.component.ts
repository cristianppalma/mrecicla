import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaquinasService } from '../maquinas.service';

@Component({
  selector: 'app-maquinas-editar',
  templateUrl: './maquinas-editar.component.html',
  styleUrls: ['./maquinas-editar.component.css']
})
export class MaquinasEditarComponent implements OnInit {
  formularioMaquina2: FormGroup;
  idRecibido:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private maquinasService:MaquinasService
  ) {

    this.formularioMaquina2 = this.formBuilder.group({
      Numero: [''],
      Serie: [''],
      Modelo: [''],
      Descripcion: [''],
      Estado: [''],
      Area: ['']
    });


    this.activeRoute.paramMap.subscribe((params) => {
      this.idRecibido = params.get('id');
      console.log('ID Recibido:', this.idRecibido);
  
      this.maquinasService.consultarmaquina(this.idRecibido).subscribe(respuesta => {
        console.log('Respuesta del servicio:', respuesta);
  
        if (respuesta && respuesta.Serie) {
          this.formularioMaquina2.setValue({
            Serie: respuesta.Serie,
            Numero: respuesta.Numero,
            Modelo: respuesta.Modelo,
            Descripcion: respuesta.Descripcion,
            Estado: respuesta.Estado,
            Area: respuesta.Area
          });
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
  enviarDatos(){
    
  }
 
  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }
}
