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


import { NavbarComponent } from './components/navbar/navbar.component';
import { SmsClientModule } from './sms-client/sms-client.module';
import { Routes, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { Test3Component } from './test3/test3.component';



const routes: Routes = [
  { path: 'profileInfo', component: ProfileInfoComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileInfoComponent,
    HomeComponent,
    AuthLoadingComponent,
    Test3Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SmsClientModule, AppRoutingModule,
    RouterModule.forRoot(routes)

  ],
  providers: [
    CognitoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
