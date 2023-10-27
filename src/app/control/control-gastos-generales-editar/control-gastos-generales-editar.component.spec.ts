import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGastosGeneralesEditarComponent } from './control-gastos-generales-editar.component';

describe('ControlGastosGeneralesEditarComponent', () => {
  let component: ControlGastosGeneralesEditarComponent;
  let fixture: ComponentFixture<ControlGastosGeneralesEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlGastosGeneralesEditarComponent]
    });
    fixture = TestBed.createComponent(ControlGastosGeneralesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
