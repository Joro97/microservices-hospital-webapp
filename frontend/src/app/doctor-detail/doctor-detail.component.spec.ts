import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailComponent } from './doctor-detail.component';

describe('DoctorDetailComponent', () => {
  let component: DoctorDetailComponent;
  let fixture: ComponentFixture<DoctorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
