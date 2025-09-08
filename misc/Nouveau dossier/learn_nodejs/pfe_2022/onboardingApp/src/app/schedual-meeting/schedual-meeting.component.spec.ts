import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedualMeetingComponent } from './schedual-meeting.component';

describe('SchedualMeetingComponent', () => {
  let component: SchedualMeetingComponent;
  let fixture: ComponentFixture<SchedualMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedualMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedualMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
