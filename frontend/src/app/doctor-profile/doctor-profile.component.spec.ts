import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileComponent } from './doctor-profile.component';

describe('DoctorProfileComponent', () => {
  let component: DoctorProfileComponent;
  let fixture: ComponentFixture<DoctorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
