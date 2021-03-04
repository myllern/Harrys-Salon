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
<<<<<<< HEAD
import { AngularFireModule} from "@angular/fire"
import { AngularFirestoreModule} from "@angular/fire/firestore"

import { environment } from 'src/environments/environment';
=======
>>>>>>> d58d6d1a41ac3e41ed84db7bb6b96e79692cbc5c

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
<<<<<<< HEAD
    

=======
>>>>>>> d58d6d1a41ac3e41ed84db7bb6b96e79692cbc5c
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
    ]),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
