import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportComplexListElemComponent } from '../../app/components/components.complex-owner-dashboard/sport-complex-list-elem/sport-complex-list-elem.component';

describe('SportComplexListElemComponent', () => {
  let component: SportComplexListElemComponent;
  let fixture: ComponentFixture<SportComplexListElemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportComplexListElemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportComplexListElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
