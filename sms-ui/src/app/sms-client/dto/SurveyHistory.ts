export class SurveyHistory {
    historyId: number;
    surveyId: number;
    userEmail: string;
    dateAssigned: Date;
    dateCompleted: Date;

    constructor(surveyId: number, dateAssigned: Date, dateCompleted: Date, 
                historyId: number, userEmail: string) {
      this.surveyId = surveyId;
      this.historyId = historyId;
      this.dateAssigned = dateAssigned;
      this.dateCompleted = dateCompleted;
      this.userEmail = userEmail;
      }
  }
