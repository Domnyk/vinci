import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSportComplexComponent } from '../../app/components/owner/complex/delete/delete-sport-complex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { SportComplexState } from '../../app/state/sport-complex.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('DeleteSportComplexComponent', () => {
  let component: DeleteSportComplexComponent;
  let fixture: ComponentFixture<DeleteSportComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, NgxsModule.forRoot([SportComplexState]), HttpClientTestingModule ],
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
