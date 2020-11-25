import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEventDetailsComponent } from './schedule-event-details.component';

describe('ScheduleEventDetailsComponent', () => {
  let component: ScheduleEventDetailsComponent;
  let fixture: ComponentFixture<ScheduleEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
