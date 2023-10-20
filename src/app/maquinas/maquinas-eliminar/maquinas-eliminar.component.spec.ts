import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinasEliminarComponent } from './maquinas-eliminar.component';

describe('MaquinasEliminarComponent', () => {
  let component: MaquinasEliminarComponent;
  let fixture: ComponentFixture<MaquinasEliminarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinasEliminarComponent]
    });
    fixture = TestBed.createComponent(MaquinasEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
