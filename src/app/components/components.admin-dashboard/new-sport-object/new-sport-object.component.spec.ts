import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportObjectComponent } from './new-sport-object.component';

xdescribe('NewSportObjectComponent', () => {
  let component: NewSportObjectComponent;
  let fixture: ComponentFixture<NewSportObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSportObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSportObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
