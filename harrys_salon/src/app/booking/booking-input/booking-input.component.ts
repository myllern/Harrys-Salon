import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-input',
  templateUrl: './booking-input.component.html',
  styleUrls: ['./booking-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BookingInputComponent implements OnInit {
  @Output() event= new EventEmitter<any>();
  

  form = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    comment: new FormControl('')
  });

  isDayChoosen: boolean = false;


  constructor() { }

  ngOnInit(): void {
  };


  //notify to parent
  onSubmit() {
    console.log(this.form.controls.date.value,
      this.form.controls.time.value,
      this.form.controls.comment.value
    );
  //Emits 
    this.event.emit(this.form);


  };
  toggleChoosenDay() {
    this.isDayChoosen = !this.isDayChoosen;
  };
};
