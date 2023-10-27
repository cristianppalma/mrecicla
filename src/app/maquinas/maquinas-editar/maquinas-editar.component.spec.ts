import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinasEditarComponent } from './maquinas-editar.component';

describe('MaquinasEditarComponent', () => {
  let component: MaquinasEditarComponent;
  let fixture: ComponentFixture<MaquinasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinasEditarComponent]
    });
    fixture = TestBed.createComponent(MaquinasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
