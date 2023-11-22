import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEmpleadoEditComponent } from './produccion-empleado-edit.component';

describe('ProduccionEmpleadoEditComponent', () => {
  let component: ProduccionEmpleadoEditComponent;
  let fixture: ComponentFixture<ProduccionEmpleadoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduccionEmpleadoEditComponent]
    });
    fixture = TestBed.createComponent(ProduccionEmpleadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
