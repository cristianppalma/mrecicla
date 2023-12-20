import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'
import { MaquinasService } from '../maquinas.service';
import { PeriodicElement } from '../PeriodicElement';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-maquinas-list',
  templateUrl: './maquinas-list.component.html',
  styleUrls: ['./maquinas-list.component.css']
})

export class MaquinasListComponent  implements OnInit {
  Maquina: PeriodicElement[] = [];
  areas: any[]=[];
  displayedColumns: string[] = ['idMaquina','Serie', 'Numero', 'Modelo', 'Descripcion', 'Estado','Area','action'];
  dataSource: MatTableDataSource<PeriodicElement>;
  filterForm: FormGroup;  // Declara un FormGroup

  constructor(private router:Router,
              private dialog: MatDialog,
              private MaquinaService:MaquinasService,
              private fb: FormBuilder,
              private excelService:ExporterService
     ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
      this.filterForm = this.fb.group({
        Area: ['']
      });
     }
  crearMaquina(){
    this.router.navigateByUrl('/dashboard/maquinas/maquinascreate');
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.filtrarPorArea();
  }

  filtrarPorArea() {
    console.log('entro');
    if (this.filterForm && this.filterForm.get('Area')) {
      console.log('segundo nivel');
      const areaControl = this.filterForm.get('Area');
      if (areaControl) {
        console.log('tercer nivel');
        const areaValue = areaControl.value;

        if (areaValue && areaValue !== '0') {
          this.dataSource.filter = areaValue.toString();
        } else {
          // Si el valor es '0' o nulo, quitar el filtro
          this.dataSource.filter = '';
        }
      }
    }
  }


  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    // Puedes abrir un modal, mostrar información adicional, etc.
    const idMaquina = element.idMaquina; // Obtener el ID de la máquina
    this.router.navigateByUrl(`/dashboard/maquinas/maquinaseditar/${idMaquina}`);
  }


  eliminarElemento(element: PeriodicElement): void {
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
    }
  }

  eliminarElemento2(element: PeriodicElement): void {
    const correoSave = this.MaquinaService.getCorreo();
    const index = this.dataSource.data.indexOf(element);
  const usuarioElimina=correoSave;
    if (index >= 0) {
      const idMaquina = element.idMaquina;
      this.dataSource.data.splice(index, 1);
      this.MaquinaService.eliminarMaquina(idMaquina, usuarioElimina).subscribe();
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
      // Aquí tienes tanto el índice como el idMaquina
      console.log(`Elemento eliminado en el índice ${index}, ID de la máquina: ${idMaquina}`);
    }
  }

  mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento(element);
      }
    });
  }

  mostrarDialogoDeConfirmacion2(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento2(element);
      }
    });
  }

  ngOnInit(): void {

    this.MaquinaService.getAreas().subscribe((data) => {
      this.areas = data;
    });
    this.MaquinaService.listarMaquina().subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      this.Maquina = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

  }

  //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-maquinaria');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-maquinaria');
  }

  regresar (){
    this.router.navigateByUrl('/dashboard/catalogos');
  }

}
