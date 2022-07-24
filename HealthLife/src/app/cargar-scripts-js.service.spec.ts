import { TestBed } from '@angular/core/testing';

import { CargarScriptsJSService } from './cargar-scripts-js.service';

describe('CargarScriptsJSService', () => {
  let service: CargarScriptsJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarScriptsJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
