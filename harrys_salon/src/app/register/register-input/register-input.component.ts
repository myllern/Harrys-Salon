import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterInputComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(false),
  });

  constructor(private db: AngularFirestore, public auth: AngularFireAuth, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  hide = true;
  get passwordInput() {
    return this.form.controls.password2;
  }
  
  async onSubmit() {
    let data = {
      id: "",
      isAdmin: this.form.controls.isAdmin.value,
      email: this.form.controls.email.value,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value
    };

    firebase.auth().createUserWithEmailAndPassword(data.email, this.form.controls.password.value)
    .then((userCredential) => {
      var user = userCredential.user;
      const res = this.db.collection('users').doc(user?.uid).ref;
      data['id'] = res.id;
      this.db.collection('users').doc(res.id).set(data);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.snackBar.open(errorMessage, "close", { horizontalPosition: 'center', verticalPosition: 'top'});
    });
  }
}
