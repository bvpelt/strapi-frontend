import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelptekstsComponent } from './helpteksts.component';

describe('HelptekstsComponent', () => {
  let component: HelptekstsComponent;
  let fixture: ComponentFixture<HelptekstsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelptekstsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelptekstsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
