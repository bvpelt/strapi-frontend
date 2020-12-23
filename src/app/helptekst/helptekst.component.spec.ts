import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelptekstComponent } from './helptekst.component';

describe('HelptekstComponent', () => {
  let component: HelptekstComponent;
  let fixture: ComponentFixture<HelptekstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelptekstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelptekstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
