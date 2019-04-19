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
import { TestComponent } from './test/test.component';


import { NavbarComponent } from './components/navbar/navbar.component';
import { SmsClientModule } from './sms-client/sms-client.module';
import { Routes, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ReportsComponent } from './reports/reports.component';
import { InterviewComponent } from './interview/interview.component';
import { ManageComponent } from './manage/manage.component';
import { SurveyComponent } from './survey/survey.component';



const routes: Routes = [
  { path: 'profileInfo', component: ProfileInfoComponent },
  { path: 'reportsRoute', component: ReportsComponent },
  { path: 'InterViewRoute', component: InterviewComponent },
  { path: 'ManageRoute', component: ManageComponent },
  { path: 'SurveyRoute', component: SurveyComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    NavbarComponent,
    ProfileInfoComponent,
    HomeComponent,
    AuthLoadingComponent,
    ReportsComponent,
    InterviewComponent,
    ManageComponent,
    SurveyComponent

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
