import { Survey } from './Survey';

export interface Question {
    questionId: number;
    question: string;
    typeId: number; // may need to do something for this.
  }

export interface SurveyQuestion {
    surveyId: Survey;
    questionId: Question;
    questionOrder: number; // may need to do something for this.
  }

