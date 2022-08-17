import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesEjerciciosComponent } from './planes-ejercicios.component';

describe('PlanesEjerciciosComponent', () => {
  let component: PlanesEjerciciosComponent;
  let fixture: ComponentFixture<PlanesEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesEjerciciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
