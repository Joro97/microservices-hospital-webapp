import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClapButtonComponent } from './clap-button.component';

describe('ClapButtonComponent', () => {
  let component: ClapButtonComponent;
  let fixture: ComponentFixture<ClapButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClapButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClapButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
