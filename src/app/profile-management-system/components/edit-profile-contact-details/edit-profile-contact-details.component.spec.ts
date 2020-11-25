import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileContactDetailsComponent } from './edit-profile-contact-details.component';

describe('EditProfileContactDetailsComponent', () => {
  let component: EditProfileContactDetailsComponent;
  let fixture: ComponentFixture<EditProfileContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
