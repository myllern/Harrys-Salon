import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  data:any;
  user:any;
  userList: any[] = [];

  hide = true;

  isSlotFree: any = {
    "09": true,
    "10": true,
    "11": true,
    "12": true,
    "13": true,
  };


  chosenDresser: any;
  hairDressers: any;


  form = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
  });

  

  constructor(private db: AngularFirestore, public auth: AngularFireAuth) {}


  ngOnInit(): void {
    
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

  onSubmit() {
    //Emits 
    console.log("on submit")
    //this.event.emit(this.form);

  };

  onBookChange(chosenDresser: any) {
    this.chosenDresser = chosenDresser.value;
  }
  toggleChosenDay(chosenDate: any) {
    this.isSlotFree = {
      "09": true,
      "10": true,
      "11": true,
      "12": true,
      "13": true,
    };
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