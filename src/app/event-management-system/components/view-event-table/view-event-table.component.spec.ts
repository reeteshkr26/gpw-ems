import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventTableComponent } from './view-event-table.component';

describe('ViewEventTableComponent', () => {
  let component: ViewEventTableComponent;
  let fixture: ComponentFixture<ViewEventTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
