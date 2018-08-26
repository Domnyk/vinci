import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain <form> element', () => {
    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    
    expect(formElement).toBeTruthy();
  });

  it ('should contain email input', () => {
    const emailInputElement: HTMLInputElement = fixture.nativeElement.querySelector('input[type="email"]');

    expect(emailInputElement).toBeTruthy();
  });

  it('should contain password input', () => {
    const passwordInputElement: HTMLInputElement = fixture.nativeElement.querySelector('input#password[type="password"]');

    expect(passwordInputElement).toBeTruthy();
  });

  it('should contain password confirmation input', () => {
    const passwordConfirmationInputElement: HTMLInputElement = fixture.nativeElement
      .querySelector('input#password-confirmation[type="password"]');

    expect(passwordConfirmationInputElement).toBeTruthy();
  });

  it('should contain login input', () => {
    const loginInputElement: HTMLInputElement = fixture.nativeElement.querySelector('input#login[type="text"]');

    expect(loginInputElement).toBeTruthy();
  });

  it('should contain display name input', () => {
    const displayNameInputElement: HTMLInputElement = fixture.nativeElement
      .querySelector('input#display-name[type="text"]');

    expect(displayNameInputElement).toBeTruthy();
  });

  it('should contain submit button', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(submitButton).toBeTruthy();
  })
});
