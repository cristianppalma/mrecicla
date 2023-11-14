import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionCreateComponent } from './produccion-create.component';

describe('ProduccionCreateComponent', () => {
  let component: ProduccionCreateComponent;
  let fixture: ComponentFixture<ProduccionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduccionCreateComponent]
    });
    fixture = TestBed.createComponent(ProduccionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
