import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-hairdressers',
  templateUrl: './hairdressers.component.html',
  styleUrls: ['./hairdressers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HairdressersComponent implements OnInit {
  recievedHairdresser: any;

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


  constructor(
    private db: AngularFirestore,
    public auth: AngularFireAuth,
    public dialogRef: MatDialogRef<HairdressersComponent>,
    private dataSerivce: DataService
  ) {}

  ngOnInit(): void {
    this.recievedHairdresser = this.dataSerivce.haridresser;
    this.db
      .collectionGroup('hairdressers')
      .valueChanges()
      .subscribe((data) => {
        this.hairDressers = data;
      });

      this.data = this.db.collection("bookings", ref => ref.where("hairdresser", "==", this.dataSerivce.haridresser.name)).valueChanges();


  }

  deleteBooking(value: any) {
    this.db.collection('bookings').doc(value.id).delete();
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
}
