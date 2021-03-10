import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  data:any;
  user:any;

  hide = true;

  form = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private db: AngularFirestore, public auth: AngularFireAuth) {}


  ngOnInit(): void {
    //If next line is removed, the bookings doesnt show. Probably because of the nested asyncs so we have to come up with another solution
    this.data = this.db.collection("bookings", ref => ref.where("user", "==", "asd")).valueChanges();
    this.auth.user.subscribe(user => {
      if(user) {
        this.db.collection("users", ref => ref.where("email", "==", user?.email)).valueChanges().subscribe(x => {
          this.user = x[0];
          this.data = this.db.collection("bookings", ref => ref.where("user", "==", this.user.id)).valueChanges();
        });
      }
    });
  }

  deleteBooking(value: any){
    this.db.collection("bookings").doc(value.id).delete();
  }

  changeEmail(){
    let currUser = firebase.auth().currentUser;
    if(currUser !== null){
      //Can fail. Need to tell user if it does
      currUser.updateEmail(this.form.controls.email.value)
      .then(() => this.db.collection("users").doc(this.user.id).update({"email": this.form.controls.email.value}))
      .catch(error => console.log(error));
    }
  }

  changeFirstName(){
    this.db.collection("users").doc(this.user.id).update({"firstname": this.form.controls.firstname.value});
  }

  changeLastName(){
    this.db.collection("users").doc(this.user.id).update({"lastname": this.form.controls.lastname.value});
  }

  changePassword(){
    let currUser = firebase.auth().currentUser;
    if(currUser !== null){
      //Can fail because of weak pw or need recent logon. Need to tell user if it does
      currUser.updatePassword(this.form.controls.password.value)
      .catch(error => console.log(error));
    }
  }
}