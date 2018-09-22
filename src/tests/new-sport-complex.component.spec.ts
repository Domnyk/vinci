import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportComplexComponent } from '../app/components/new-sport-complex/new-sport-complex.component';

describe('NewSportComplexComponent', () => {
  let component: NewSportComplexComponent;
  let fixture: ComponentFixture<NewSportComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSportComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSportComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
