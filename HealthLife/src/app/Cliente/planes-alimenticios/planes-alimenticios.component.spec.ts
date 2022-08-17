import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesAlimenticiosComponent } from './planes-alimenticios.component';

describe('PlanesAlimenticiosComponent', () => {
  let component: PlanesAlimenticiosComponent;
  let fixture: ComponentFixture<PlanesAlimenticiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesAlimenticiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesAlimenticiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
