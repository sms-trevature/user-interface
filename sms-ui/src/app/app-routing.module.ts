import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoadingComponent } from './components/auth-loading/auth-loading.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InterviewListComponent } from './components/interview-list/interview-list.component';

import { SurveyCreatorComponent } from './components/survey/survey-creator/survey-creator.component';
import { SurveyListComponent } from './components/survey/survey-list/survey-list.component';

import { SurveyDataComponent } from './components/survey/survey-data/survey-data.component'; // temporary -Steph
import { AssignSurveyComponent } from './components/survey/assign-survey/assign-survey.component';
import { SurveyGridComponent } from './components/survey/survey-grid/survey-grid.component';
import { AuthGuard } from './services/guards/auth-guard.service';
//Router Guard citation: https://codeburst.io/using-angular-route-guard-for-securing-routes-eabf5b86b4d1


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth-loading',
    component: AuthLoadingComponent
  },
  {

    path: 'interview-list',
    component: InterviewListComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'survey',
    component: SurveyCreatorComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'surveyList',
    component: SurveyListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'survey-data', // temporary path just need to see my page - Steph
    component: SurveyDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assign-survey',
    component: AssignSurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-survey',
    component: SurveyCreatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'survey-template',
    component: SurveyGridComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
