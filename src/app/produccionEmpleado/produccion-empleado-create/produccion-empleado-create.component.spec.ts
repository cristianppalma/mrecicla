import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEmpleadoCreateComponent } from './produccion-empleado-create.component';

describe('ProduccionEmpleadoCreateComponent', () => {
  let component: ProduccionEmpleadoCreateComponent;
  let fixture: ComponentFixture<ProduccionEmpleadoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduccionEmpleadoCreateComponent]
    });
    fixture = TestBed.createComponent(ProduccionEmpleadoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
