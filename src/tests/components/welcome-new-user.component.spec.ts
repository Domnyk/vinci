import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeNewUserComponent } from '../../app/components/components.welcome/welcome/welcome-new-user.component';

xdescribe('WelcomeNewUserComponent', () => {
  let component: WelcomeNewUserComponent;
  let fixture: ComponentFixture<WelcomeNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
