import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private db: AngularFirestore) { };


  ngOnInit() {
    this.db.collection('users').valueChanges()
      .subscribe(val => console.log(val));

  }
  title = 'harrys-salon';
}


