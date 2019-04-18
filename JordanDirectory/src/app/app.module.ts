import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'profileInfo', component: ProfileInfoComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
