import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaquinasService } from '../maquinas.service';
@Component({
  selector: 'app-maquinas-editar',
  templateUrl: './maquinas-editar.component.html',
  styleUrls: ['./maquinas-editar.component.css']
})
export class MaquinasEditarComponent implements OnInit {
  formularioMaquina: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private MaquinasService: MaquinasService
  ) {
    this.formularioMaquina = this.formBuilder.group({
      Numero: ['', [Validators.required]],
      Serie: [''],
      Modelo: [''],
      Descripcion: [''],
      Estado: [''],
      Area: ['']
    });
  }
  //regalo para el negro 
  // https://www.eneba.com/latam/xbox-prototype-biohazard-bundle-xbox-live-key-argentina?itm_campaign=Recombee%20Page&itm_content=recommended%20for%20you%20page&itm_medium=product%20card&itm_term=261

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/maquinas/maquinas');
  }
  enviarDatos(): void {
    if (this.formularioMaquina.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioMaquina.value);
      this.MaquinasService.agregarMaquina(this.formularioMaquina.value).subscribe(
        (response) => {
          // Manejar la respuesta del servicio aquí
        },
        (error) => {
          // Manejar errores del servicio aquí
        }
      );
    }
  }


  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }
}
