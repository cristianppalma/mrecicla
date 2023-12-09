import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioSalidaCatalogoComponent } from './inventario-salida-catalogo.component';

describe('InventarioSalidaCatalogoComponent', () => {
  let component: InventarioSalidaCatalogoComponent;
  let fixture: ComponentFixture<InventarioSalidaCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioSalidaCatalogoComponent]
    });
    fixture = TestBed.createComponent(InventarioSalidaCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
