import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoErrorComponent } from './aviso-error.component';

describe('AvisoErrorComponent', () => {
  let component: AvisoErrorComponent;
  let fixture: ComponentFixture<AvisoErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvisoErrorComponent]
    });
    fixture = TestBed.createComponent(AvisoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
