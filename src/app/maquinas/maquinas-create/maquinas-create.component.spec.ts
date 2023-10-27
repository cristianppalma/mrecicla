import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinasCreateComponent } from './maquinas-create.component';

describe('MaquinasCreateComponent', () => {
  let component: MaquinasCreateComponent;
  let fixture: ComponentFixture<MaquinasCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinasCreateComponent]
    });
    fixture = TestBed.createComponent(MaquinasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
