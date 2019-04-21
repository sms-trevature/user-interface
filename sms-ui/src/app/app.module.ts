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
import { NewInterviewComponent } from './components/new-interview/new-interview.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

import { ReportsComponent } from './reports/reports.component';
import { InterviewComponent } from './interview/interview.component';
import { ManageComponent } from './manage/manage.component';
import { SurveyComponent } from './survey/survey.component';
import { MngrSubAssociatesComponent } from './mngr-sub-associates/mngr-sub-associates.component';
import { SubMan2CohortComponent } from './sub-man2-cohort/sub-man2-cohort.component';
import { FakeServiceComponent } from './fake-service/fake-service.component';

import { SurveyCreatorComponent } from './components/survey/survey-creator/survey-creator.component';
import { SurveyListComponent } from './components/survey/survey-list/survey-list.component';
import { TimestampPipe } from './pipe/timestamp.pipe';




const routes: Routes = [
  { path: 'profileInfo', component: ProfileInfoComponent },
  {path: '', component: LoginComponent},
  { path: 'reportsRoute', component: ReportsComponent },
  { path: 'InterViewRoute', component: InterviewComponent },
  {
    path: 'ManageRoute', component: ManageComponent,
    children: [
      {
        path: 'subMan1Internal',
        component: MngrSubAssociatesComponent
      },
      {
        path: 'cohort',
        component: SubMan2CohortComponent
      },
      {
        path: '',
        component: SubMan2CohortComponent
      }
    ]
  },
  { path: 'SurveyRoute', component: SurveyListComponent }
  // need to change back to SurveyComponentlater later, now just testing functionalities

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileInfoComponent,
    HomeComponent,
    AuthLoadingComponent,

    ReportsComponent,
    InterviewComponent,
    ManageComponent,
    SurveyComponent,
    MngrSubAssociatesComponent,
    SubMan2CohortComponent,
    FakeServiceComponent,

    NewInterviewComponent,
    SurveyCreatorComponent,
    SurveyListComponent,
    TimestampPipe,


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
    CognitoService, FakeServiceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
