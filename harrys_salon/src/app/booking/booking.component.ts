import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm = new FormGroup({});



  constructor() { }

  ngOnInit(): void {
  }

  reciveBooking($event: any){
    console.log($event)
    this.bookingForm = $event;
  }

}
