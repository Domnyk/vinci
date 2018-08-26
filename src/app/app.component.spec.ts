import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

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
