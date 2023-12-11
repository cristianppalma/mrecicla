import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCatalogoComponent } from './inventario-catalogo.component';

describe('InventarioCatalogoComponent', () => {
  let component: InventarioCatalogoComponent;
  let fixture: ComponentFixture<InventarioCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioCatalogoComponent]
    });
    fixture = TestBed.createComponent(InventarioCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
