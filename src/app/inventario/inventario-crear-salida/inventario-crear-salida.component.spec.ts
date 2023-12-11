import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCrearSalidaComponent } from './inventario-crear-salida.component';

describe('InventarioCrearSalidaComponent', () => {
  let component: InventarioCrearSalidaComponent;
  let fixture: ComponentFixture<InventarioCrearSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioCrearSalidaComponent]
    });
    fixture = TestBed.createComponent(InventarioCrearSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
