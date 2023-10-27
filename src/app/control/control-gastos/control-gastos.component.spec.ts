import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGastosComponent } from './control-gastos.component';

describe('ControlGastosComponent', () => {
  let component: ControlGastosComponent;
  let fixture: ComponentFixture<ControlGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlGastosComponent]
    });
    fixture = TestBed.createComponent(ControlGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
