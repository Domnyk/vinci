import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToDashboardComponent } from './welcome-to-dashboard.component';

describe('WelcomeToDashboardComponent', () => {
  let component: WelcomeToDashboardComponent;
  let fixture: ComponentFixture<WelcomeToDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeToDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
