import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Subject<any> = new Subject();

  constructor(private db: AngularFirestore, public auth: AngularFireAuth) { };

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if(user) {
        this.db.collection("users", ref => ref.where("email", "==", user?.email)).valueChanges().subscribe(x => {
          this.user.next(x[0]);
        });
      }
    });
  }

  logout() {
    this.auth.signOut();
  }
  
  title = 'harrys-salon';
}


