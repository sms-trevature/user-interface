import { Survey } from './Survey';

import { Answer } from './Answer';

export interface Responses {
    id: number;
    userEmail: string;
    surveyId: Survey;
    answerId: Answer;
  }
