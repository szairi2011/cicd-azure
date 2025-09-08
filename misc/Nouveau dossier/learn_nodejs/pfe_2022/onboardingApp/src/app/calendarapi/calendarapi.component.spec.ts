import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarapiComponent } from './calendarapi.component';

describe('CalendarapiComponent', () => {
  let component: CalendarapiComponent;
  let fixture: ComponentFixture<CalendarapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
