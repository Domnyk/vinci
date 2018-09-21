import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardSidebarComponent } from './admin-dashboard-sidebar.component';

describe('AdminDashboardSidebarComponent', () => {
  let component: AdminDashboardSidebarComponent;
  let fixture: ComponentFixture<AdminDashboardSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
