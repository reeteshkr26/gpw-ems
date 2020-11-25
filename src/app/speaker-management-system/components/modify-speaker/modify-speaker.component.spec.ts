import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySpeakerComponent } from './modify-speaker.component';

describe('ModifySpeakerComponent', () => {
  let component: ModifySpeakerComponent;
  let fixture: ComponentFixture<ModifySpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
