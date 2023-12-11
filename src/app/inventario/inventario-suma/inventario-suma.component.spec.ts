import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioSumaComponent } from './inventario-suma.component';

describe('InventarioSumaComponent', () => {
  let component: InventarioSumaComponent;
  let fixture: ComponentFixture<InventarioSumaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioSumaComponent]
    });
    fixture = TestBed.createComponent(InventarioSumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
