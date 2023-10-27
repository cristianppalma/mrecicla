import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventario-edit',
  templateUrl: './inventario-edit.component.html',
  styleUrls: ['./inventario-edit.component.css'],
})
export class InventarioEditComponent {

  Areas: Area[] = [
    {value: 'area1', viewValue: 'telares'},
    {value: 'area2', viewValue: 'hilado'},
    {value: 'area3', viewValue: 'otro'},
  ];
   

  constructor(private router:Router, private _bottomSheet: MatBottomSheet) {}

  inventarioReturn(){
    this.router.navigateByUrl('/dashboard/inventario/inventarios');
  }

  openBottomSheet(): void {
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