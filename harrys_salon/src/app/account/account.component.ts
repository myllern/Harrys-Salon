import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private db: AngularFirestore, public auth: AngularFireAuth, private snackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.data = this.db.collection("bookings", ref => ref.where("user", "==", "asdasd")).valueChanges();
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
      .then(() => {
        this.db.collection("users").doc(this.user.id).update({"email": this.form.controls.email.value})
        this.snackBar.open("You have changed your email to " + this.form.controls.email.value, "close", { horizontalPosition: 'center', verticalPosition: 'top'});
      })
      .catch(error => {
        this.snackBar.open(error.message + " Your email was not updated.", "close", { horizontalPosition: 'center', verticalPosition: 'top'});
        console.log(error)
      });
      this.form.controls.email.setValue("");
    }
  }

  changeFirstName(){
    this.db.collection("users").doc(this.user.id).update({"firstname": this.form.controls.firstname.value});
    this.snackBar.open("You have changed your firstname to " + this.form.controls.firstname.value, "close", { horizontalPosition: 'center', verticalPosition: 'top'});
    this.form.controls.firstname.setValue("");
  }

  changeLastName(){
    this.db.collection("users").doc(this.user.id).update({"lastname": this.form.controls.lastname.value});
    this.snackBar.open("You have changed your lastname to " + this.form.controls.lastname.value, "close", { horizontalPosition: 'center', verticalPosition: 'top'});
    this.form.controls.lastname.setValue("");
  }

  changePassword(){
    let currUser = firebase.auth().currentUser;
    if(currUser !== null){
      //Can fail because of weak pw or need recent logon. Need to tell user if it does
      currUser.updatePassword(this.form.controls.password.value).then(() => {
        this.snackBar.open("You have updated your password.", "close", { horizontalPosition: 'center', verticalPosition: 'top'})
      })
      .catch(error => {
        this.snackBar.open(error.message + " Your Password was not updated.", "close", { horizontalPosition: 'center', verticalPosition: 'top'});
        console.log(error)
      });
      this.form.controls.password.setValue("");
    }
  }

  checkDate(date: Date){
    return date > new Date();
  }
}