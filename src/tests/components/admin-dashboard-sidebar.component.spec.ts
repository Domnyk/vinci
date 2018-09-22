import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardSidebarComponent } from '../../app/components/admin-dashboard-sidebar/admin-dashboard-sidebar.component';

xdescribe('AdminDashboardSidebarComponent', () => {
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
