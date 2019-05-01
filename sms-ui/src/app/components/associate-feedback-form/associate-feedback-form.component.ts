import { Component, OnInit } from '@angular/core';
import { AssociateFeedbackService, AssociateFeedback } from './associate-feedback.service';
import { Router } from '@angular/router';
import { InterviewFormat } from 'src/app/sms-client/dto/InterviewFormat';

@Component({
  selector: 'app-associate-feedback-form',
  templateUrl: './associate-feedback-form.component.html',
  styleUrls: ['./associate-feedback-form.component.scss']
})
export class AssociateFeedbackFormComponent implements OnInit {

  private _maxDate: Date;
  private _minDate: Date;
  _descriptionProvided = false;
  private receivedNotifications: Date;
  _dayNotice = false;
  _interviewFormatStr = '';
  _proposedFormatStr = '';

  associateInputList: any[];

  associateFeed: AssociateFeedback;
  interviewFormat: InterviewFormat;
  proposedFormat: InterviewFormat;
  constructor(private associateFeedbackService: AssociateFeedbackService, private router: Router) {
    this._maxDate = new Date();
    this._maxDate.setDate(this._maxDate.getDate());
  }

  get maxDate(): Date {
    return this._maxDate;
  }

  set maxDate(temp: Date) {
    this._maxDate = temp;
  }

  get descriptionProvided(): boolean {
    return this._descriptionProvided;
  }

  set descriptionProvided(temp: boolean) {
    this._descriptionProvided = temp;
  }

  // get recievedNotifications(): Date {
  //   return this._recievedNotifications;
  // }

  // set recievedNotifications(temp: Date) {
  //   this._recievedNotifications = temp;
  // }

  get dayNotice(): boolean {
    return this._dayNotice;
  }

  set dayNotice(temp: boolean) {
    this._dayNotice = temp;
  }

  get interviewFormatStr() {
    return this._interviewFormatStr;
  }

  set interviewFormatStr(temp: string) {
    this._interviewFormatStr = temp;
  }
  get proposedFormatStr() {
    return this._proposedFormatStr;
  }

  set proposedFormatStr(temp: string) {
    this._proposedFormatStr = temp;
  }

  ngOnInit() {

    //this.postAssociateInput();
  }

  postAssociateInput() {

    console.log('in the submit')

    console.log(this._interviewFormatStr);
    console.log(this.interviewFormat);
    console.log(this.dayNotice);
    console.log("THE DATE IS: " + this.receivedNotifications);
    this.interviewFormat = { 'id': 2, 'formatDesc': this._interviewFormatStr };
    console.log(this.interviewFormat.formatDesc);
    console.log('seperator')
    this.proposedFormat = { 'id': 2, 'formatDesc': this._proposedFormatStr };;
    console.log('made it past the formats')
    let associateInput = new AssociateFeedback(this._descriptionProvided, this.receivedNotifications, this._dayNotice, this.interviewFormat, this.proposedFormat);
    this.associateFeedbackService.postAssociateInput(associateInput).subscribe(data => {
      data.receivedNotifications = this.receivedNotifications,
        data.descriptionProvided = this._descriptionProvided,
        data.interviewFormat = this.interviewFormat,
        data.proposedFormat = this.proposedFormat,
        data.dayNotice = this._dayNotice

    });
  }

  newInterviewFeedback() {
    console.log("inside of new interview feedback");

  }
}
