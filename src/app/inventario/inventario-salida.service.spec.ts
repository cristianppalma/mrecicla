import { TestBed } from '@angular/core/testing';

import { InventarioSalidaService } from './inventario-salida.service';

describe('InventarioSalidaService', () => {
  let service: InventarioSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
