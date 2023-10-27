import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesControlComponent } from './solicitudes-control.component';

describe('SolicitudesControlComponent', () => {
  let component: SolicitudesControlComponent;
  let fixture: ComponentFixture<SolicitudesControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesControlComponent]
    });
    fixture = TestBed.createComponent(SolicitudesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
