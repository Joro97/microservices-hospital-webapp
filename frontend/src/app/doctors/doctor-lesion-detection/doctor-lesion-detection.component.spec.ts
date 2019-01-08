import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLesionDetectionComponent } from './doctor-lesion-detection.component';

describe('DoctorLesionDetectionComponent', () => {
  let component: DoctorLesionDetectionComponent;
  let fixture: ComponentFixture<DoctorLesionDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorLesionDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorLesionDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
