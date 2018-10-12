import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexOwnerDashboardComponent } from '../../app/components/components.complex-owner-dashboard/complex-owner-dashboard/complex-owner-dashboard.component';

xdescribe('ComplexOwnerDashboardComponent', () => {
  let component: ComplexOwnerDashboardComponent;
  let fixture: ComponentFixture<ComplexOwnerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexOwnerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
