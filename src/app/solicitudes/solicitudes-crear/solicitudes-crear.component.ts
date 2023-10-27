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
  selector: 'app-solicitudes-crear',
  templateUrl: './solicitudes-crear.component.html',
  styleUrls: ['./solicitudes-crear.component.css']
})
export class SolicitudesCrearComponent {
  
  Areas: Area[] = [
    {value: 'area1', viewValue: 'telares'},
    {value: 'area2', viewValue: 'hilado'},
    {value: 'area3', viewValue: 'otro'},
  ];

  constructor(private router:Router, private _bottomSheet: MatBottomSheet) {}

  SolicitudesReturn()
  {
    this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
  } 
    /**
    boton de abrir imagen
    */
  openBottomSheet(): void 
  {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}

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
