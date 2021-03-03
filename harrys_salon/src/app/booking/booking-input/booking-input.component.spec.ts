import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingInputComponent } from './booking-input.component';

describe('BookingInputComponent', () => {
  let component: BookingInputComponent;
  let fixture: ComponentFixture<BookingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
