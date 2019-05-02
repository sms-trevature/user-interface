import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyQuestion } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
import { CookieStorage } from '@aws-amplify/auth';
import { QuestionOfSurveyService } from 'src/app/sms-client/clients/survey-question.service';

@Component({
  selector: 'app-survey-grid',
  templateUrl: './survey-grid.component.html',
  styleUrls: ['./survey-grid.component.scss']
})
export class SurveyGridComponent implements OnInit {

  listOfSurvey: Survey[];
  filteredListOfSurvey: Survey[];
  curTemplate: SurveyQuestion[];
  curTempAnswers: Array<Answer[]>;
  listFilterVar: string;

  constructor(
    private surveyService: SurveyService,
    private sqService: SurveyQuestionService,
    private answerService: SurveyAnswerService,
    private qOSService: QuestionOfSurveyService) { }

  ngOnInit() {
    this.listOfSurvey = [];
    this.surveyService.findAll().subscribe(
      data => {
        for (const temp of data) {
          if (temp.template) {
            this.listOfSurvey.push(temp);
          }
        }
        this.filteredListOfSurvey = this.listOfSurvey;
      }
    );
  }

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.filteredListOfSurvey = (this.listFilterVar) ?
    this.performFilter(this.listFilterVar) : this.listOfSurvey;
  }

  performFilter(filterBy: string): Survey[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listOfSurvey.filter((temp: Survey) =>
      (temp.title.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.description.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
    );
  }

  closeSurvey(index: number) {
    this.listOfSurvey[index].closingDate = new Date();
    this.surveyService.save(this.listOfSurvey[index]).subscribe(
      data => {
        this.listOfSurvey[index] = data;
      }
    );
  }

  create() {
    const temp = this.curTemplate[0].surveyId;
    temp.published = !temp.published;
    temp.template = !temp.template;
    this.sqService.getTemplate(temp.surveyId).subscribe(
      qSConjuctions=>{
        this.surveyService.save(temp).subscribe(
          data => {
            alert("success");
            for(let temp of qSConjuctions){
              let sq = new SurveyQuestion(null, data, temp.questionId,temp.questionOrder);
              this.sqService.save(sq).subscribe();
            }
          }
        );
        
      }
    );
    
  }
  checkTemplate(surveyId: number) {
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
}
