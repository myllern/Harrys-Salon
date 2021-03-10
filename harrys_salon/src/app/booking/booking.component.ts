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
  user:any;
  dag: Date | undefined;
  constructor(private db: AngularFirestore, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if(user) {
        this.db.collection("users", ref => ref.where("email", "==", user?.email)).valueChanges().subscribe(x => this.user = x[0]);
      }
    });
  }

  reciveBooking($event: any){
    //console.log($event);
    this.bookingForm = $event;
    
   // console.log(this.bookingForm.value);
    let dag = this.bookingForm.value;

    dag.user = this.user.id;
    const res = this.db.collection('bookings').doc().ref;
    dag['id'] = res.id;
    this.db.collection('bookings').doc(res.id).set(dag)
  }

}
