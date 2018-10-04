import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportArenaComponent } from '../../app/components/components.admin-dashboard/new-sport-arena/new-sport-arena.component';

xdescribe('NewSportArenaComponent', () => {
  let component: NewSportArenaComponent;
  let fixture: ComponentFixture<NewSportArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSportArenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSportArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
