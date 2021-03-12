import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  recievedUser: any;

  data: any;
  user: any;
  userList: any[] = [];
  hide = true;

  isSlotFree: any = {
    '09': true,
    '10': true,
    '11': true,
    '12': true,
    '13': true,
  };

  chosenDresser: any;
  hairDressers: any;

  userForm = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    hairdresser: new FormControl(''),
  });

  form = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    comment: new FormControl(''),
    hairdresser: new FormControl('')
  });

  initializeForm(email: string, firstname: string, lastname: string) {
    this.userForm = new FormGroup({
      email: new FormControl(email),
      firstname: new FormControl(firstname),
      lastname: new FormControl(lastname),
      hairdresser: new FormControl(''),
    });
  }

  constructor(
    private db: AngularFirestore,
    public auth: AngularFireAuth,
    public dialogRef: MatDialogRef<AdminComponent>,
    private dataSerivce: DataService
  ) {}

  ngOnInit(): void {
    this.recievedUser = this.dataSerivce.sharedData;
    this.db
      .collectionGroup('hairdressers')
      .valueChanges()
      .subscribe((data) => {
        this.hairDressers = data;
      });
    this.initializeForm(
      this.dataSerivce.sharedData.email,
      this.dataSerivce.sharedData.firstname,
      this.dataSerivce.sharedData.lastname
    );

    this.db.collection("users", ref => ref.where("email", "==", this.dataSerivce.sharedData.email?.email)).valueChanges().subscribe(x => {
      this.user = x[0];
      this.data = this.db.collection("bookings", ref => ref.where("user", "==", this.dataSerivce.sharedData.id)).valueChanges();
    });
    console.log('admin comp sharedData: ' + this.userForm.value.firstname);
  }

  deleteBooking(value: any) {
    this.db.collection('bookings').doc(value.id).delete();
  }

  onSubmit() {
    //Emits
    //this.dialogRef.close();
    //console.log('on submit' + this.form.value.date);
    let dag = this.form.value;

    dag.user = this.dataSerivce.sharedData.id;
    const res = this.db.collection('bookings').doc().ref;
    dag['id'] = res.id;
    this.db.collection('bookings').doc(res.id).set(dag)
    //this.event.emit(this.form);

  }

  onBookChange(chosenDresser: any) {
    this.chosenDresser = chosenDresser.value;
  }
  
  toggleChosenDay(chosenDate: any) {
    this.isSlotFree = {
      '09': true,
      '10': true,
      '11': true,
      '12': true,
      '13': true,
    };

    this.db.collectionGroup('bookings').valueChanges().subscribe((data) => {
      data.forEach((bookingDate: any) => {

        if ((bookingDate.date.toDate().toString() === chosenDate.value.toString()) && (this.chosenDresser === bookingDate.hairdresser)) {
          this.isSlotFree[bookingDate.time] = false;;

        }
      });
    });

  }



  changePassword() {
    let currUser = firebase.auth().currentUser;
    if (currUser !== null) {
      //Can fail because of weak pw or need recent logon. Need to tell user if it does
      currUser
        .updatePassword(this.form.controls.password.value)
        .catch((error) => console.log(error));
    }
  }
}
