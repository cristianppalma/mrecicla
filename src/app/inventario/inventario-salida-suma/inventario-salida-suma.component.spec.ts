import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioSalidaSumaComponent } from './inventario-salida-suma.component';

describe('InventarioSalidaSumaComponent', () => {
  let component: InventarioSalidaSumaComponent;
  let fixture: ComponentFixture<InventarioSalidaSumaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioSalidaSumaComponent]
    });
    fixture = TestBed.createComponent(InventarioSalidaSumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
