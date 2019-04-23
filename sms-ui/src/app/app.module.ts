import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AuthLoadingComponent } from './components/auth-loading/auth-loading.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CognitoService } from './services/cognito.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SmsClientModule } from './sms-client/sms-client.module';
<<<<<<< HEAD
import { MyStuffComponent } from './my-stuff/my-stuff.component';


=======
import { InterviewListComponent } from './components/interview-list/interview-list.component';
import { NewInterviewComponent } from './components/new-interview/new-interview.component';
import { AssociateFeedbackFormComponent } from './components/associate-feedback-form/associate-feedback-form.component';
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

import { CohortModalComponent } from './components/cohortModal/cohort-modal.component';

import { SurveyListComponent } from './components/survey/survey-list/survey-list.component';
import { TimestampPipe } from './pipe/timestamp.pipe';
import { SurveyGridComponent } from './components/survey/survey-grid/survey-grid.component';
import { AnswerData2Component } from './components/survey/survey-data/graph-components/answer-data2/answer-data2.component';
import { AnswerData1Component } from './components/survey/survey-data/graph-components/answer-data1/answer-data1.component';
import { SurveyDataComponent } from './components/survey/survey-data/survey-data.component';
import { AssignSurveyComponent } from './components/survey/assign-survey/assign-survey.component';

import { AnswerData3Component } from './components/survey/survey-data/graph-components/answer-data3/answer-data3.component';
import { AnswerData4Component } from './components/survey/survey-data/graph-components/answer-data4/answer-data4.component';
import { AnswerData5Component } from './components/survey/survey-data/graph-components/answer-data5/answer-data5.component';
import { AnswerData6Component } from './components/survey/survey-data/graph-components/answer-data6/answer-data6.component';
import { AnswerData7Component } from './components/survey/survey-data/graph-components/answer-data7/answer-data7.component';


import { StagingMgrFeedbackComponent } from './components/interview/staging-mgr-feedback/staging-mgr-feedback.component';
>>>>>>> 3cbe734b13b682eaed0e0a8dc16c80cd2f237ade




const routes: Routes = [
  { path: 'profileInfo', component: ProfileInfoComponent },
  { path: '', component: LoginComponent },
  { path: 'reportsRoute', component: ReportsComponent },
  { path: 'InterViewRoute', component: InterviewComponent },
  { path: 'CreateInterviewRoute', component: NewInterviewComponent},
  { path: 'AssociateFeedbackRoute', component: AssociateFeedbackFormComponent},
  { path: 'ManagerFeedbackRouting', component: StagingMgrFeedbackComponent},
  { path: 'InterviewListRoute', component: InterviewListComponent},
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
<<<<<<< HEAD
    MyStuffComponent
=======
    InterviewListComponent,
    AssociateFeedbackFormComponent,
    SurveyCreatorComponent,
    StagingMgrFeedbackComponent,
    SurveyGridComponent,
    ReportsComponent,
    InterviewComponent,
    ManageComponent,
    SurveyComponent,
    MngrSubAssociatesComponent,
    SubMan2CohortComponent,
    FakeServiceComponent,
    NewInterviewComponent,
    SurveyCreatorComponent,
    AssociateFeedbackFormComponent,
    SurveyCreatorComponent,
    CohortModalComponent,


    SurveyCreatorComponent,
    SurveyListComponent,
    TimestampPipe,

    SurveyDataComponent,
    AnswerData1Component,
    AnswerData2Component,
    AssignSurveyComponent,
    AnswerData3Component,
    AnswerData4Component,
    AnswerData5Component,
    AnswerData6Component,
    AnswerData7Component,


>>>>>>> 3cbe734b13b682eaed0e0a8dc16c80cd2f237ade
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    SmsClientModule, AppRoutingModule,
    RouterModule.forRoot(routes)

  ],
  providers: [
    CognitoService, FakeServiceComponent
  ],
  /* AppComponent */
  bootstrap: [AppComponent]
})
export class AppModule { }
