import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedHoursComponent } from './booked-hours.component';

describe('BookedHoursComponent', () => {
  let component: BookedHoursComponent;
  let fixture: ComponentFixture<BookedHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
