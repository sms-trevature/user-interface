import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLoadingComponent } from './components/auth-loading/auth-loading.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CognitoService } from './services/cognito.service';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
=======
import { SmsClientModule } from './sms-client/sms-client.module';


>>>>>>> dc432b0b495464c297f74c3fec09af8d7bd4a09c


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    NavbarComponent
=======
    HomeComponent,
    AuthLoadingComponent
>>>>>>> dc432b0b495464c297f74c3fec09af8d7bd4a09c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SmsClientModule
  ],
  providers: [
    CognitoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
