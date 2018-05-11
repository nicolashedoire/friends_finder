import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityChoiceComponent } from './activity-choice.component';

describe('ActivityChoiceComponent', () => {
  let component: ActivityChoiceComponent;
  let fixture: ComponentFixture<ActivityChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
