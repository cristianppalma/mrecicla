import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoDialogComponent } from './aviso-dialog.component';

describe('AvisoDialogComponent', () => {
  let component: AvisoDialogComponent;
  let fixture: ComponentFixture<AvisoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvisoDialogComponent]
    });
    fixture = TestBed.createComponent(AvisoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
