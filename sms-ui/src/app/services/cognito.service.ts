import { Injectable } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

Amplify.configure({
  Auth: {
    region: environment.awsRegion,
    userPoolId: environment.cognitoUserPoolId,
    userPoolWebClientId: environment.cognitoClientId,
  }
});


@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private currentUserStream = new BehaviorSubject<any>(undefined);
  public currentUser$ = this.currentUserStream.asObservable();

  private tokenStream = new BehaviorSubject<string>(undefined);
  public token$ = this.tokenStream.asObservable();

  private newPasswordUser: any = null;
  // private grabUserJson:
  constructor() {
    this.setup();
  }

  async login(username: string, password: string) {
    const response = await Auth.signIn(username, password);
    this.setup();

    /// ---Query by email for user info..

    this.getCurrent();

    if (response.challengeName !== 'NEW_PASSWORD_REQUIRED') {
      this.setup();
      return;
    } else {
      this.newPasswordUser = response;
      throw {
        message: 'NEW_PASSWORD_REQUIRED'
      };
    }
  }

  async logout() {
    localStorage.clear();
    await Auth.signOut();
    this.tokenStream.next(undefined);
    this.currentUserStream.next(undefined);
  }
  async getCurrent() {
  }
  async kyle(email){
    Auth.signUp(email);
  }
  async setNewPassword(password: string) {
    const response = await Auth.completeNewPassword(
      this.newPasswordUser,
      password,
      {}
    );
    console.log(response);
    this.setup();
  }

  private setup() {

    Auth.currentAuthenticatedUser()
      .then(user => {
        // initialize the jwt for axios
        Auth.currentSession()
          .then(data => {
            localStorage.setItem('token', data.getIdToken().getJwtToken());
            this.tokenStream.next(data.getIdToken().getJwtToken());
            const currentUser = data.getIdToken().payload;
            this.currentUserStream.next(currentUser);
          });
        // create interval to refresh the jwt periodically
        setInterval(() => {
          Auth.currentSession()
            .then(data => {
              localStorage.setItem('token', data.getIdToken().getJwtToken());
              this.tokenStream.next(data.getIdToken().getJwtToken());
              const currentUser = data.getIdToken().payload;
              this.currentUserStream.next(currentUser);
            });
        }, 300000);
      })
      .catch(e => {
        return;
      });
  }

  getCurrentSession() {
    Auth.currentSession().then(data => {
      console.log(data)
    })
  }
  someMethod() {
    Auth.currentUserInfo().then(user => {
      console.log(user);
      return user;
    })
  }

  get localStorage():Storage{
    return localStorage;
  }
}
