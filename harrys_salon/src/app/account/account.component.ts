import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  data:any;

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
    var user = firebase.auth().currentUser;
    user?.updateEmail(this.form.controls.email.value).then( function(){
      console.log("success");
    });
  }

  changeFirstName(){
    
  }

  changeLastName(){
    
  }

  changePassword(){
    var user = firebase.auth().currentUser;
    user?.updatePassword(this.form.controls.password.value);
  }

}