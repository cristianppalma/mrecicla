import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';


interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventario-crear',
  templateUrl: './inventario-crear.component.html',
  styleUrls: ['./inventario-crear.component.css'],

  
})



export class InventarioCrearComponent {

  Areas: Area[] = [
    {value: 'area1', viewValue: 'telares'},
    {value: 'area2', viewValue: 'hilado'},
    {value: 'area3', viewValue: 'otro'},
  ];

  constructor(private router:Router, private _bottomSheet: MatBottomSheet) {}

  inventarioReturn()
  {
    this.router.navigateByUrl('/dashboard/inventario/inventarios');
  } 
    /**
    boton de abrir imagen
    */
  openBottomSheet(): void 
  {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'inventario-opciones.component.html',
  standalone: true,
  imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
    /**
    boton de abrir imagen
    */
