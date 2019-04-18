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
<<<<<<< HEAD
import { AssociateFeedbackFormComponent } from './components/associate-feedback-form/associate-feedback-form.component';
=======
import { Routes, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { SurveyCreatorComponent } from './components/survey/survey-creator/survey-creator.component';

>>>>>>> e598b4128aaaa5866ae45cd550f205993f60aafa


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
<<<<<<< HEAD
    AssociateFeedbackFormComponent
=======
    SurveyCreatorComponent

>>>>>>> e598b4128aaaa5866ae45cd550f205993f60aafa
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
