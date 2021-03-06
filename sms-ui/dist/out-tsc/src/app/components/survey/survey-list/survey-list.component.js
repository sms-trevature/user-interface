import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
var SurveyListComponent = /** @class */ (function () {
    function SurveyListComponent(surveyService, sqService, answerService) {
        this.surveyService = surveyService;
        this.sqService = sqService;
        this.answerService = answerService;
    }
    SurveyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.surveyService.findAll().subscribe(function (data) {
            // data[i].dateCreated = new Date(data[i].dateCreated);
            // data[i].closingDate = new Date(data[i].closingDate);
            _this.listOfSurvey = data;
        });
    };
    SurveyListComponent.prototype.closeSurvey = function (index) {
        var _this = this;
        this.listOfSurvey[index].closingDate = new Date();
        this.surveyService.closeSurvey(this.listOfSurvey[index]).subscribe(function (data) {
            _this.listOfSurvey[index] = data;
        });
    };
    SurveyListComponent.prototype.checkTemplate = function (surveyId) {
        var _this = this;
        this.curTemplate = [];
        this.curTempAnswers = [];
        this.sqService.getTemplate(surveyId).subscribe(function (data) {
            _this.curTemplate = data;
            var _loop_1 = function (i) {
                _this.answerService.findByQuestionId(data[i].questionId.questionId).subscribe(function (curQuestionAnswerList) {
                    _this.curTempAnswers[i] = curQuestionAnswerList;
                    console.log(curQuestionAnswerList);
                });
            };
            // tslint:disable-next-line: forin
            for (var i in data) {
                _loop_1(i);
            }
        });
    };
    SurveyListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-survey-list',
            templateUrl: './survey-list.component.html',
            styleUrls: ['./survey-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [SurveyService,
            SurveyQuestionService,
            SurveyAnswerService])
    ], SurveyListComponent);
    return SurveyListComponent;
}());
export { SurveyListComponent };
//# sourceMappingURL=survey-list.component.js.map