import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesCrearComponent } from './solicitudes-crear.component';

describe('SolicitudesCrearComponent', () => {
  let component: SolicitudesCrearComponent;
  let fixture: ComponentFixture<SolicitudesCrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesCrearComponent]
    });
    fixture = TestBed.createComponent(SolicitudesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
