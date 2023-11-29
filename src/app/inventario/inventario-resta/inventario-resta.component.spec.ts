import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioRestaComponent } from './inventario-resta.component';

describe('InventarioRestaComponent', () => {
  let component: InventarioRestaComponent;
  let fixture: ComponentFixture<InventarioRestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioRestaComponent]
    });
    fixture = TestBed.createComponent(InventarioRestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
