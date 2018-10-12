import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportComplexDashboardComponent } from '../../app/components/components.complex-owner-dashboard/sport-complex-dashboard/sport-complex-dashboard.component';

xdescribe('SportComplexDashboardComponent', () => {
  let component: SportComplexDashboardComponent;
  let fixture: ComponentFixture<SportComplexDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportComplexDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportComplexDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
