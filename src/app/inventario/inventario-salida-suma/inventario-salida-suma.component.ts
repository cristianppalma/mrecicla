import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InventarioSalidaService } from '../inventario-salida.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';

@Component({
  selector: 'app-inventario-salida-suma',
  templateUrl: './inventario-salida-suma.component.html',
  styleUrls: ['./inventario-salida-suma.component.css']
})
export class InventarioSalidaSumaComponent implements OnInit {

  productosSalida: any[] = [];
  formularioSumaInventarioSalida: FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private inventarioSalidaService:InventarioSalidaService,
    private dialog:MatDialog
  )
  {
    this.formularioSumaInventarioSalida = this.formBuilder.group({

    })
  }

  enviarDatos() {
    //
  }

  ngOnInit(): void {
    //
    this.inventarioSalidaService.getProductosSalida().subscribe((data)=>{
      this.productosSalida=data;
    });
  }

  cancelar() {
    if (window.history.length > 1) {
      // Si hay más de una página en el historial, regresa a la página anterior
      window.history.back();
    } else {
      // Si no hay más páginas en el historial, puedes redirigir a una página específica
      // o realizar alguna otra acción en su lugar.
      console.warn('No hay páginas anteriores en el historial.');
      // Puedes redirigir a otra página o realizar otra acción aquí
    }
  }

}
