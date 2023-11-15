import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEditarComponent } from './produccion-editar.component';

describe('ProduccionEditarComponent', () => {
  let component: ProduccionEditarComponent;
  let fixture: ComponentFixture<ProduccionEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduccionEditarComponent]
    });
    fixture = TestBed.createComponent(ProduccionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
