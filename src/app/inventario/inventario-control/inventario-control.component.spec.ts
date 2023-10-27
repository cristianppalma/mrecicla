import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioControlComponent } from './inventario-control.component';

describe('InventarioControlComponent', () => {
  let component: InventarioControlComponent;
  let fixture: ComponentFixture<InventarioControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioControlComponent]
    });
    fixture = TestBed.createComponent(InventarioControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
