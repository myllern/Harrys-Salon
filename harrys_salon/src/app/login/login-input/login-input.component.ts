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
  constructor(private db: AngularFirestore, public auth: AngularFireAuth) {}

  ngOnInit(): void {
    //TODO firebase.auth() is not loaded here. get email from somewhere else
    //let usr = firebase.auth().currentUser?.email
    let usr = "admin@test.test"
    this.db.collection("bookings", ref => ref.where("user", "==", usr)).valueChanges()
    .subscribe(val => {console.log(val);this.data = val;console.log(firebase)});
  }
  hide = true;
  get passwordInput() { return this.form.controls.password2; } 
  onSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //TODO Show error to user (wrong password etc)
      console.log(errorMessage);
    });
  }
}
