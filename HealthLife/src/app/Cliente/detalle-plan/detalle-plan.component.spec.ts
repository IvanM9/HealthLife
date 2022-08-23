import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePlanComponent } from './detalle-plan.component';

describe('DetallePlanComponent', () => {
  let component: DetallePlanComponent;
  let fixture: ComponentFixture<DetallePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
