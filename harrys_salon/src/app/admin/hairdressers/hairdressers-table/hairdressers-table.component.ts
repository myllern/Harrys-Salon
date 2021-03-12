import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatSortModule  } from "@angular/material/sort";
import { MatTable } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { BookingComponent } from 'src/app/booking/booking.component';
import { Output } from'@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HairdressersComponent } from '../hairdressers.component';
import { HairdressersTableDataSource, HairdressersTableItem } from './hairdressers-table-datasource';

@Component({
  selector: 'app-hairdressers-table',
  templateUrl: './hairdressers-table.component.html',
  styleUrls: ['./hairdressers-table.component.css']
})
export class HairdressersTableComponent implements AfterViewInit, OnInit {
  @Output() $event = new EventEmitter<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<HairdressersTableItem>;
  dataSource!: HairdressersTableDataSource;
  source : any[]=[];
  constructor(private db: AngularFirestore, public auth: AngularFireAuth, private dialog: MatDialog, private dataService: DataService ) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions'];

  ngOnInit() {
    this.db.collectionGroup('hairdressers').valueChanges().subscribe((data) => {
      this.source = data
      this.dataSource = new HairdressersTableDataSource(data)
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
    this.dialog.open(HairdressersComponent, dialogConfig)
   // this.adminComp.getUserObject(row);
   
    this.dataService.haridresser = row;
  }
}
