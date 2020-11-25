import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpeakerComponent } from './create-speaker.component';

describe('CreateSpeakerComponent', () => {
  let component: CreateSpeakerComponent;
  let fixture: ComponentFixture<CreateSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
