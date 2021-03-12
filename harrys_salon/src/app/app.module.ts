import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { BookingInputComponent } from './booking/booking-input/booking-input.component';
import { LoginInputComponent } from './login/login-input/login-input.component';
import { RegisterInputComponent } from './register/register-input/register-input.component';
import { AngularFireModule} from "@angular/fire"
import { AngularFirestoreModule} from "@angular/fire/firestore";
import { MatCheckboxModule } from '@angular/material/checkbox';


import { environment } from 'src/environments/environment';
import { AccountComponent } from './account/account.component';
import { UserTableComponent } from './admin/users/user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserComponent } from './admin/users/user.component';
import { AdminComponent } from './admin/admin.component';
import { HairdressersComponent } from './admin/hairdressers/hairdressers.component';
import { HairdressersTableComponent } from './admin/hairdressers/hairdressers-table/hairdressers-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BookingComponent,
    HomeComponent,
    BookingInputComponent,
    LoginInputComponent,
    RegisterInputComponent,
    AccountComponent,
    UserTableComponent,
    UserComponent,
    HairdressersComponent,
    HairdressersTableComponent,
    AdminComponent

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'account', component: AccountComponent },
      { path: 'admin', component: AdminComponent }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
