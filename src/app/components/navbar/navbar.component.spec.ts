import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <nag> tag', () => {
  const navElement: HTMLElement = fixture.nativeElement.querySelector('nav');

  expect(navElement).toBeTruthy();
});

  it(`should have link to 'Sign up' page`, () => {
    const aElement: HTMLLinkElement = fixture.nativeElement.querySelector('a[href="/sign_up"]')

    expect(aElement).toBeTruthy();
  });

  it(`should have link to 'Sign in' page`, () => {
    const aElement: HTMLLinkElement = fixture.nativeElement.querySelector('a[href="/sign_in"]')

    expect(aElement).toBeTruthy();
  });

  it(`should have link to 'Map' page`, () => {
    const aElement: HTMLLinkElement = fixture.nativeElement.querySelector('a[href="/map"]')

    expect(aElement).toBeTruthy();
  });
});
