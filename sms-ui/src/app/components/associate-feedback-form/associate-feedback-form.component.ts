import { Component, OnInit } from '@angular/core';
import { AssociateFeedbackService, AssociateFeedback } from './associate-feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associate-feedback-form',
  templateUrl: './associate-feedback-form.component.html',
  styleUrls: ['./associate-feedback-form.component.scss']
})
export class AssociateFeedbackFormComponent implements OnInit {

  public minDate: Date = new Date('01/01/2016');
  public maxDate: Date = new Date('12/31/2019');
  public value: Date = new Date('05/16/2017'); 

  _descriptionProvided = false;
  _recievedNotifications = '';
  _dayNotice = false;
  _interviewFormat = '';
  _proposedFormat = '';

  associateInputList: any[];

  constructor(private associateFeedbackService: AssociateFeedbackService, private router: Router) {

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

  ngOnInit() {

    this.postAssociateInput();
  }

  postAssociateInput() {
    this.associateFeedbackService.getAssociateInput().subscribe((data: AssociateFeedback) => {
      console.log(data);

      this.associateInputList = [
        {
          descriptionProvided: data.descriptionProvided,
          recievedNotifications: data.recievedNotifications,
          dayNotice: data.dayNotice,
          interFormat: data.interFormat,
          proposedFormat: data.proposedFormat
        }
      ]
    });
  }

  newInterviewFeedback() {
   
  }
}
