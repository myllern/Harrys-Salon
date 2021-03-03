import { NgModule } from '@angular/core';


import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';





const material = [
  MatInputModule,
  DragDropModule,
  MatGridListModule,
  MatChipsModule,
  MatListModule,
  MatRadioModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTooltipModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule
]

@NgModule({

  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
