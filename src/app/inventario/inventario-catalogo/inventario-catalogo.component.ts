import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PeriodicElement } from '../PeriodicElement';
import { MatDialog } from '@angular/material/dialog';
import { InventarioService } from '../inventario.service';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { FormGroup } from '@angular/forms';

import { ExporterService } from 'src/app/services/exporter.service';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-inventario-catalogo',
  templateUrl: './inventario-catalogo.component.html',
  styleUrls: ['./inventario-catalogo.component.css']
})
export class InventarioCatalogoComponent implements OnInit {
  usuarioTienePermisoSuper: boolean;
  areas:any[];
  Producto:PeriodicElement[] = [];
  displayedColumns:string[];
  dataSource: MatTableDataSource<PeriodicElement>;
  filterForm: FormGroup;
  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    const idproducto = element.idInventarioFabrica;
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/inventario/inventarioEdit/${idproducto}`)
  }

  constructor(private router:Router,
    private dialog:MatDialog,
    private InventarioService:InventarioService,
    private excelService:ExporterService

    ) {

      this.dataSource=new MatTableDataSource<PeriodicElement>([]);

      const nombreUsuarioTipo = this.InventarioService.getTipoUsuario();
      this.usuarioTienePermisoSuper = this.verificarPermisosDelUsuarioSuper();

      if (nombreUsuarioTipo === "SuperAdministrador") {
        this.displayedColumns = [
          'idInventarioFabrica',
          'NombreInsumo',
          'Composicion',
          'Calibre',
          'Empresa'
        ];
      } else {
        this.displayedColumns = [
          'idInventarioFabrica',
          'NombreInsumo',
          'Composicion',
          'Calibre'
        ];
      }
    }

    private verificarPermisosDelUsuarioSuper(): boolean {
      const nombreUsuario = localStorage.getItem("NombreTipoUser");
      // Realiza la lógica paradeterminar si el usuario tiene permiso basado en su rol
      return ((nombreUsuario === "SuperAdministrador"));
    }

    inventarioSuma(){
      this.router.navigateByUrl('/dashboard/inventario/inventarioSuma');
    }
    inventario(){
      this.router.navigateByUrl('/dashboard/inventario/inventarioCrear');
    }
    inventarioS(){
      this.router.navigateByUrl('/dashboard/inventario/inventarios');
    }
    inventarioSalida(){
      this.router.navigateByUrl('/dashboard/inventario/inventarioSalida');
    }

    eliminarInventario(element:PeriodicElement): void{
      const index =this.dataSource.data.indexOf(element);

      if(index >=0){
        this.dataSource.data.splice(index,1);
        this.dataSource._updateChangeSubscription();
      }
    }
    eliminarInventario2(element:PeriodicElement): void{
      const correoSave = this.InventarioService.getCorreo();
      const index =this.dataSource.data.indexOf(element);
      const usuarioElimina=correoSave;
      if(index >=0){
        const idproducto = element.idInventarioFabrica;
        this.dataSource.data.splice(index,1);
        this.InventarioService.borrarInventario(idproducto,usuarioElimina).subscribe();
        this.dataSource._updateChangeSubscription();
      }
    }
    mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.eliminarInventario(element);
        }
      });
    }
    mostrarDialogoDeConfirmacion2(element: PeriodicElement): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.eliminarInventario2(element);
        }
      });
    }

  ngOnInit(): void {
    this.InventarioService.listarInventario().subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      this.Producto = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

    this.InventarioService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });
  }

  //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-catalogo-inventario-insumos');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-catalogo-inventario-insumos');
  }

}
