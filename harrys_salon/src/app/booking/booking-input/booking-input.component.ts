import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ɵpatchComponentDefWithScope } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileDetector } from 'selenium-webdriver';


@Component({
  selector: 'app-booking-input',
  templateUrl: './booking-input.component.html',
  styleUrls: ['./booking-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BookingInputComponent implements OnInit {
  @Output() event = new EventEmitter<any>();


  isSlotFree = [
    { "10": Boolean },
    { "11": Boolean },
    { "12": Boolean },
    { "13": Boolean },
    { "14": Boolean }
  ];

  form = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    comment: new FormControl('')
  });

  isDayChoosen: Boolean | undefined;

  bookings: any;

  constructor(public auth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
  };

  //notify to parent
  onSubmit() {
    //Emits 
    this.event.emit(this.form);




  };

  toggleChoosenDay(choosenDate: any) {
   this.db.collectionGroup('bookings').valueChanges().subscribe((data:any)=>
   console.log(data.toDate()));
  }



  isDateChoosen() {
    return this.isDateChoosen;
  };

  availableSlots() {
  



  }
};
