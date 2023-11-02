import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreasService } from '../areas.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-areas-create',
  templateUrl: './areas-create.component.html',
  styleUrls: ['./areas-create.component.css']
})
export class AreasCreateComponent implements OnInit {
  formularioAreas: FormGroup;

  constructor(private router:Router,
    private formBuilder: FormBuilder,
    private areasService: AreasService,
    private dialog: MatDialog) {
      this.formularioAreas = this.formBuilder.group({
        NombreArea: ['', [Validators.required]],
        DescripcionArea: [''],
        EstadoArea: ['']
      });
    }
  AGREGAR(){

  }
  CANCELAR(){
    
    this.router.navigateByUrl('/dashboard/areas/areas');
  }
  enviarDatos(): void
  {
    if (this.formularioAreas.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioAreas.value);
      this.areasService.agregarArea(this.formularioAreas.value).subscribe(
        (response) => {
         console.log('Se registro correctamente');
         this.mostratDialogoAviso();
        },
        (error) => {
          console.log(error);
          // Manejar errores del servicio aquí
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
        this.router.navigateByUrl('/dashboard/areas/areas');
      }
    });
  
  }


  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }


}
