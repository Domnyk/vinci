import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneFlashMessageComponent } from '../../app/components/standalone-flash-message/standalone-flash-message.component';

xdescribe('StandaloneFlashMessageComponent', () => {
  let component: StandaloneFlashMessageComponent;
  let fixture: ComponentFixture<StandaloneFlashMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandaloneFlashMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandaloneFlashMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
