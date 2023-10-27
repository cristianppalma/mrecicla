import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoLoginComponent } from './aviso-login.component';

describe('AvisoLoginComponent', () => {
  let component: AvisoLoginComponent;
  let fixture: ComponentFixture<AvisoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvisoLoginComponent]
    });
    fixture = TestBed.createComponent(AvisoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
