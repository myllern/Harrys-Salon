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
    this.auth.user.subscribe(user => {
      if(user) {
        this.data = this.db.collection("bookings", ref => ref.where("user", "==", user?.email)).valueChanges();
        this.db.collection("users", ref => ref.where("email", "==", user?.email)).valueChanges().subscribe(x => this.user = x[0]);
      }
    });
  }

  deleteBooking(value: any){
    let dateData = this.db.collection("bookings", ref => ref.where("date", "==", value.date)).get();
    let dateDocsID:string[] = [];
    dateData.forEach(val => {
      val.docs.forEach(doc => {
       dateDocsID.push(doc.id);
      });
    });
    console.log(dateDocsID);
    let timeData = this.db.collection("bookings", ref => ref.where("time", "==",value.time)).get();
    let timeDocsID: string[] = [];
    timeData.forEach(val => {
      val.docs.forEach(doc => {
       timeDocsID.push(doc.id);
      });
    });
    console.log(timeDocsID);
    let userDocsID: string[] = []; 
    this.auth.user.subscribe(user => {
      this.db.collection("bookings", ref => ref.where("user", "==", user?.email)).get().forEach(val => {
        val.docs.forEach(doc => {
         userDocsID.push(doc.id);
        });
      });
    });
    console.log(userDocsID);
    console.log("im before the loop" + " " + dateDocsID.length);

    for(let i = 0; i < dateDocsID.length; i++){
      console.log(dateDocsID[i]);
    }
    userDocsID.forEach( s => {
      console.log("im here");
        if(timeDocsID.indexOf(s) !== -1 && dateDocsID.indexOf(s) !== -1){
          this.db.collection("bookings").doc(s).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        }
    }
    );
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
      .then(() => this.db.collection("users").doc(this.user.id).update({"password": this.form.controls.password.value}))
      .catch(error => console.log(error));
    }
  }
}