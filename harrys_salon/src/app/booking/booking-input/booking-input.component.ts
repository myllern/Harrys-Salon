import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-input',
  templateUrl: './booking-input.component.html',
  styleUrls: ['./booking-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BookingInputComponent implements OnInit {

  form = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
  });

  isDayChoosen: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.controls.date.value,
      this.form.controls.time.value
    )
  }
  toggleChoosenDay() {
    this.isDayChoosen = !this.isDayChoosen;
  }


}
