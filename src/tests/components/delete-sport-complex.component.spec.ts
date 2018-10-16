import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSportComplexComponent } from '../../app/components/components.complex-owner-dashboard/delete-sport-complex/delete-sport-complex.component';

describe('DeleteSportComplexComponent', () => {
  let component: DeleteSportComplexComponent;
  let fixture: ComponentFixture<DeleteSportComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSportComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSportComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});