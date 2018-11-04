import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArenasComponent } from './list-arenas.component';

describe('ListArenasComponent', () => {
  let component: ListArenasComponent;
  let fixture: ComponentFixture<ListArenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
