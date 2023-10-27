import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEditComponent } from './solicitudes-edit.component';

describe('SolicitudesEditComponent', () => {
  let component: SolicitudesEditComponent;
  let fixture: ComponentFixture<SolicitudesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesEditComponent]
    });
    fixture = TestBed.createComponent(SolicitudesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
