import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource, UserTableItem } from './user-table-datasource';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { AdminComponent } from '../admin.component';
import { BookingComponent } from 'src/app/booking/booking.component';
import { Output } from'@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @Output() $event = new EventEmitter<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<UserTableItem>;
  dataSource!: UserTableDataSource;
  source : any[]=[];
  constructor(private db: AngularFirestore, public auth: AngularFireAuth, private dialog: MatDialog) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['email', 'firstname', 'lastname', 'actions'];

  ngOnInit() {
    this.db.collectionGroup('users').valueChanges().subscribe((data) => {
      //console.log(data)
      this.source = data
      this.dataSource = new UserTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource; 

    });  
  
  }

  ngAfterViewInit() {
    
  }

  onPopUp(row: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AdminComponent, dialogConfig)
   // this.adminComp.getUserObject(row);
    this.$event.emit(row);
    console.log("hello pop up! " + row.firstname)
  }
}
