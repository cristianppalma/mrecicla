import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEditSalidaComponent } from './inventario-edit-salida.component';

describe('InventarioEditSalidaComponent', () => {
  let component: InventarioEditSalidaComponent;
  let fixture: ComponentFixture<InventarioEditSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioEditSalidaComponent]
    });
    fixture = TestBed.createComponent(InventarioEditSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
