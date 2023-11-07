import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTableComponent } from './lista-empleados.component';

describe('ListaEmpleadosComponent', () => {
  let component: UsuarioTableComponent;
  let fixture: ComponentFixture<UsuarioTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioTableComponent]
    });
    fixture = TestBed.createComponent(UsuarioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
