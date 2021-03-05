import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm = new FormGroup({});



  constructor(private db: AngularFirestore, public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  reciveBooking($event: any){
    console.log($event);
    this.bookingForm = $event;
    let data = this.bookingForm.value;
    data.user = firebase.auth().currentUser?.email;
    const res = this.db.collection('bookings').doc().set(data);
  }

}
