import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { UsersClientService } from 'src/app/sms-client/clients/users-client.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { User } from 'src/app/sms-client/dto/User';
import { SurveyHistoryService } from 'src/app/sms-client/clients/survey-history.service';
import { SurveyHistory } from 'src/app/sms-client/dto/SurveyHistory';
import { SurveyQuestion } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
import { Responses } from 'src/app/sms-client/dto/Response';




@Component({
  selector: 'app-assign-survey',
  templateUrl: './assign-survey.component.html',
  styleUrls: ['./assign-survey.component.scss']
})
export class AssignSurveyComponent implements OnInit {

  listOfSurvey: Survey[];
  listOfSurveyHistory: SurveyHistory[];
  curTemplate: SurveyQuestion[];
  curTempAnswers: Array<Answer[]>;
  inputAns: string[] = [];
  inputMultiAns: string[] = [];
  inputMultiAnsQNum: number[] = [];
  constructor(
    private surveyService: SurveyService,
    private historyService: SurveyHistoryService,
    private sqService: SurveyQuestionService,
    private answerService: SurveyAnswerService
    ) { }

  ngOnInit() {
    this.listOfSurveyHistory = [];
    this.listOfSurvey = [];
    this.surveyService.findAll().subscribe(
      surveyList => {
        this.historyService.findByEmail( localStorage.getItem('userEmail')).subscribe(
          data => {
            for (const temp of data) {
              for (const suv of surveyList) {
                if (suv.surveyId === temp.surveyId && !temp.dateCompleted) {
                  this.listOfSurvey.push(suv);
                }
              }
              if (!temp.dateCompleted) {
                this.listOfSurveyHistory.push(temp);
              }
            }
          }
        );
      }
    );


  }
  openSurvey(surveyId: number) {
    this.curTemplate = [];
    this.curTempAnswers = [];
    this.sqService.getTemplate(surveyId).subscribe(
      data => {
        this.curTemplate = data;
        // tslint:disable-next-line: forin
        for (const i in data) {
          this.answerService.findByQuestionId(data[i].questionId.questionId).subscribe(
            curQuestionAnswerList => {
              this.curTempAnswers[i] = curQuestionAnswerList;
            }
          );
        }
      }
    );
  }
  closeSurvey(index: number) {
    this.listOfSurvey[index].closingDate = new Date();
    // this.surveyService.save(this.listOfSurvey[index]).subscribe(
    //   data => {
    //     this.listOfSurvey[index] = data;
    //     console.log(this.listOfSurvey[index]);
    //   }
    // );

  }
  close() {
    window.location.reload();
  }
  submit() {
    const responseList: Responses[] = [];
    const answerList: Answer[] = [];
// tslint:disable-next-line: forin
    for (const i in this.inputAns) {
      let tempAns;
      if (this.curTemplate[i].questionId.typeId === 5) {
        tempAns = new Answer(null, this.inputAns[i], this.curTemplate[i].questionId.questionId);
        // need to send to db and get back then push to answerlist here
        answerList.push(tempAns);
      } else {
        for (const ansForCurQuestion of this.curTempAnswers[i]) {
          if (ansForCurQuestion.answer === this.inputAns[i]) {
            tempAns = ansForCurQuestion;
          }
        }
      }
      responseList.push(new Responses(null, localStorage.getItem('userEmail'), this.curTemplate[i].surveyId, tempAns));
    }

    console.log(this.inputAns);
    console.log(this.inputMultiAns);
    console.log(this.inputMultiAnsQNum);
    for (let x = 0; x < this.inputMultiAns.length; x++) {
      if (this.inputMultiAns[x]) {
        const index = x / this.inputMultiAnsQNum[x] - 1;
        const tempSurvey = this.curTemplate[this.inputMultiAnsQNum[x] - 1].surveyId;
        const tempAns = this.curTempAnswers[this.inputMultiAnsQNum[x] - 1][index];
        responseList.push(new Responses(null, localStorage.getItem('userEmail'), tempSurvey, tempAns));
      }
    }

    console.log(answerList);
    console.log(responseList);
  }
}
