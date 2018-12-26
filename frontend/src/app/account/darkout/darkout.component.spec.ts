import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkoutComponent } from './darkout.component';

describe('DarkoutComponent', () => {
  let component: DarkoutComponent;
  let fixture: ComponentFixture<DarkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
