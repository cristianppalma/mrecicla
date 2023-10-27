import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasCreateComponent } from './areas-create.component';

describe('AreasCreateComponent', () => {
  let component: AreasCreateComponent;
  let fixture: ComponentFixture<AreasCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasCreateComponent]
    });
    fixture = TestBed.createComponent(AreasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
