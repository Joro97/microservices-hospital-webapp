import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsrowComponent } from './iconsrow.component';

describe('IconsrowComponent', () => {
  let component: IconsrowComponent;
  let fixture: ComponentFixture<IconsrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
