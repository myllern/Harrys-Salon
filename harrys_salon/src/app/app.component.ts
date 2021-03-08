import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data:any;

  constructor(private db: AngularFirestore, public auth: AngularFireAuth) { };

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }
  
  title = 'harrys-salon';
}


