import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarListElemComponent } from '../../app/components/components.complex-owner-dashboard/sidebar-list-elem/sidebar-list-elem.component';

describe('SidebarListElemComponent', () => {
  let component: SidebarListElemComponent;
  let fixture: ComponentFixture<SidebarListElemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarListElemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarListElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
