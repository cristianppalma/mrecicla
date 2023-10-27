import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlGastosGeneralesCrearComponent } from './control-gastos-generales-crear.component';

describe('ControlGastosGeneralesCrearComponent', () => {
  let component: ControlGastosGeneralesCrearComponent;
  let fixture: ComponentFixture<ControlGastosGeneralesCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlGastosGeneralesCrearComponent]
    });
    fixture = TestBed.createComponent(ControlGastosGeneralesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
