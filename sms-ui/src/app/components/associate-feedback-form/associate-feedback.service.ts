import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AssociateFeedback {
  '_descriptionProvided': boolean;
  '_recievedNotifications': string;
  '_dayNotice': boolean;
  '_interviewFormat': string;
  '_proposedFormat': string;

  constructor(descriptionProvided: boolean, recievedNotifications: string, dayNotice: boolean, interviewFormat: string, proposedFormat: string) {
    this._descriptionProvided = descriptionProvided;
    this._recievedNotifications = recievedNotifications;
    this._dayNotice = dayNotice;
    this._interviewFormat = interviewFormat;
    this._proposedFormat = proposedFormat;
  }

  get descriptionProvided(): boolean {
    return this._descriptionProvided;
  }

  set descriptionProvided(temp: boolean) {
   this._descriptionProvided = temp;
  }

  get recievedNotifications(): string {
    return this._recievedNotifications;
  }

  set recievedNotifications(temp: string) {
    this._recievedNotifications = temp;
  }

  get dayNotice(): boolean {
    return this._dayNotice;
  }

  set dayNotice(temp: boolean) {
    this._dayNotice = temp;
  }

  get interviewFormat(): string {
    return this._interviewFormat;
  }

  set interFormat(temp: string) {
    this._interviewFormat = temp;
  }

  get proposedFormat(): string {
    return this._proposedFormat;
  }

  set proposedFormat(temp: string) {
    this._proposedFormat = temp;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssociateFeedbackService {

  private url = '/interview-service/interview/associateInput';

  constructor(private httpClient: HttpClient) {

  }

  getAssociateInput(): Observable<AssociateFeedback> {
    return this.httpClient.get<AssociateFeedback>(this.url);
  }
}
