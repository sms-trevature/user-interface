import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CognitoService } from './services/cognito.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { SmsClientModule } from './sms-client/sms-client.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SmsClientModule
  ],
  providers: [
    CognitoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
