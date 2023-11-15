import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEmpleadoListComponent } from './produccion-empleado-list.component';

describe('ProduccionEmpleadoListComponent', () => {
  let component: ProduccionEmpleadoListComponent;
  let fixture: ComponentFixture<ProduccionEmpleadoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduccionEmpleadoListComponent]
    });
    fixture = TestBed.createComponent(ProduccionEmpleadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
