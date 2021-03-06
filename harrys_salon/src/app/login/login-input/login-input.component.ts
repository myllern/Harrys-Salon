import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginInputComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    //password2: new FormControl('', [Validators.required, Validators.min(3)]),
  });
data:any
  constructor(private db: AngularFirestore, public auth: AngularFireAuth, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if(user) {
        this.data = this.db.collection("bookings", ref => ref.where("user", "==", user?.email)).valueChanges();
      }
    });
  }


  hide = true;
  get passwordInput() { return this.form.controls.password2; } 

  onSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value)
    .then((userCredential) => {
      var user = userCredential.user;
      //console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //TODO Show error to user (wrong password etc)
      this.snackbar.open(errorMessage, "Close", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'});
      console.log(errorMessage);
    });
  }
}
