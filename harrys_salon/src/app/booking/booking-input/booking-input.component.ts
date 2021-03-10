import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ɵpatchComponentDefWithScope } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContentObserver } from '@angular/cdk/observers';


@Component({
  selector: 'app-booking-input',
  templateUrl: './booking-input.component.html',
  styleUrls: ['./booking-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BookingInputComponent implements OnInit {
  @Output() event = new EventEmitter<any>();


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
    date: new FormControl(''),
    time: new FormControl(''),
    comment: new FormControl(''),
    hairdresser: new FormControl('')
  });
  constructor(public auth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {

    this.db.collectionGroup('hairdressers').valueChanges().subscribe((data) => {
      this.hairDressers = data;
    });
  };

  //notify to parent
  onSubmit() {
    //Emits 
    this.event.emit(this.form);

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
    


    this.db.collectionGroup('bookings').valueChanges().subscribe((data) => {
      data.forEach((bookingDate: any) => {

        if ((bookingDate.date.toDate().toString() === chosenDate.value.toString()) && (this.chosenDresser === bookingDate.hairdresser)) {
          this.isSlotFree[bookingDate.time] = false;;

        }
      });
    });


  };

};
