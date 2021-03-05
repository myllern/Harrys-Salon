import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data:any;

  constructor(private db: AngularFirestore, public auth: AngularFireAuth) { };

  ngOnInit() {
    this.data = this.db.collection('users').doc('JohnDoe').valueChanges()
      .subscribe(val => this.data = val);
    
    


    
  }

  logout() {
    this.auth.signOut();
  }
  
  title = 'harrys-salon';
}


