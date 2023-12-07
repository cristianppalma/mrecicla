import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaService } from '../empresa.service';
import { PeriodicElement } from '../PeriodicElement';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  Empresa:PeriodicElement[] = [];
  displayedColumns:string[] = ['idFabrica','NombreFabrica','DireccionFabrica','TelefonoFabrica','CorreoFabrica','FechaCreacion','UsuarioCreador','action']
  dataSource: MatTableDataSource<PeriodicElement>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    const idFabrica = element.idFabrica;
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/empresas/empresaEdit/${idFabrica}`)
  }

  constructor(
    private router:Router,
    private dialog:MatDialog,
    private empresaService:EmpresaService
  ) {
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
  }

  crearEmpresa(){
    this.router.navigateByUrl('/dashboard/empresas/empresaCreate');
  }

  borrarInventarioSalida(element:PeriodicElement): void{
    const correoSave = this.empresaService.getCorreo();
    const index =this.dataSource.data.indexOf(element);
    const usuarioElimina=correoSave;
    if(index >=0){
      const idFabrica = element.idFabrica;
      this.dataSource.data.splice(index,1);
      this.empresaService.eliminarEmpresas(idFabrica,usuarioElimina).subscribe();
      this.dataSource._updateChangeSubscription();

       // Aquí tienes tanto el índice como el idMaquina
    console.log(`Elemento eliminado en el índice ${index}, ID de la empresa: ${idFabrica}`);
    }
  }

  mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.borrarInventarioSalida(element);
      }
    });
  }

  ngOnInit(): void {
    this.empresaService.listarEmpresas().subscribe((respuesta: PeriodicElement[]) => {
      console.log('LISTA DE LAS EMPRESAS: ', respuesta);
      this.Empresa = respuesta;
      this.dataSource.data = respuesta;
    });
  }

  regresar (){
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
