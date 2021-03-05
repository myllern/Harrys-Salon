import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data:any;

  constructor(private db: AngularFirestore) { };


  ngOnInit() {
    this.data = this.db.collection('users').doc('JohnDoe').valueChanges()
      .subscribe(val => this.data = val);
    
    


    
  }
  
  title = 'harrys-salon';
}


