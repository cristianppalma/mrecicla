import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinasListComponent } from './maquinas-list.component';

describe('MaquinasListComponent', () => {
  let component: MaquinasListComponent;
  let fixture: ComponentFixture<MaquinasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinasListComponent]
    });
    fixture = TestBed.createComponent(MaquinasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
