import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from '../../app/components/sign-in/sign-in.component';

xdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain <form> element', () => {
    const formElem: HTMLFormElement = fixture.nativeElement.querySelector('form');

    expect(formElem).toBeTruthy();
  });

  it('should contain email input', () => {
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('input[type="email"]');

    expect(emailInput).toBeTruthy();
  });

  it('should containe password input', () => {
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('input[type="password"]');

    expect(passwordInput).toBeTruthy();
  });

  it(`should contain button with 'Facebook' text `, () => {
    const buttonElem: HTMLButtonElement = fixture.nativeElement.querySelector('#facebook-login button');

    expect(buttonElem.innerText).toContain('Facebook');
  })
});
