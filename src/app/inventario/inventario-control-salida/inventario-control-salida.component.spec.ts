import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioControlSalidaComponent } from './inventario-control-salida.component';

describe('InventarioControlSalidaComponent', () => {
  let component: InventarioControlSalidaComponent;
  let fixture: ComponentFixture<InventarioControlSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioControlSalidaComponent]
    });
    fixture = TestBed.createComponent(InventarioControlSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
