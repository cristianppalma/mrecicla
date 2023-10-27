import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGastosGeneralesComponent } from './control-gastos-generales.component';

describe('ControlGastosGeneralesComponent', () => {
  let component: ControlGastosGeneralesComponent;
  let fixture: ComponentFixture<ControlGastosGeneralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlGastosGeneralesComponent]
    });
    fixture = TestBed.createComponent(ControlGastosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
