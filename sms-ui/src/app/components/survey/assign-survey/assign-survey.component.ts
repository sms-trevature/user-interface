import { Component, OnInit, Directive, Input } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyHistoryService } from 'src/app/sms-client/clients/survey-history.service';
import { SurveyHistory } from 'src/app/sms-client/dto/SurveyHistory';
import { SurveyQuestion } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
import { Responses } from 'src/app/sms-client/dto/Response';
import { SurveyResponseService } from 'src/app/sms-client/clients/survey-response.service';



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
    private answerService: SurveyAnswerService,
    private responseService: SurveyResponseService
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

        for (const i of Object.keys(data)) {
          this.answerService.findByQuestionId(data[i].questionId.questionId).subscribe(
            curQuestionAnswerList => {
              this.curTempAnswers[i] = curQuestionAnswerList;
            }
          );
        }
      }
    );
  }

  close() {
    window.location.reload();
  }
  async submit() {
    const responseList: Responses[] = [];
    const answerList: Answer[] = [];

    for (const i of Object.keys(this.inputAns)) {
      let tempAns;
      if (this.curTemplate[i].questionId.typeId === 5) {
        tempAns = new Answer(null, this.inputAns[i], this.curTemplate[i].questionId.questionId);
        await this.answerService.save(tempAns).subscribe(
          data => {tempAns = data; }
        );
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

    for (const x in this.inputMultiAns) {
      if (this.inputMultiAns[x]) {
        const hide = document.getElementById(x.toString()) as HTMLInputElement;
        const iPlus1 = Number(hide.value);
        const index = Number(x) / iPlus1 - 1;
        const tempSurvey = this.curTemplate[iPlus1 - 1].surveyId;
        const tempAns = this.curTempAnswers[iPlus1 - 1][index];
        responseList.push(new Responses(null, localStorage.getItem('userEmail'), tempSurvey, tempAns));
      }
    }
    this.responseService.saveList(responseList).subscribe(
      hope => {
        if (hope) {
          alert('successful');
        }
      }
    );
  }
}
