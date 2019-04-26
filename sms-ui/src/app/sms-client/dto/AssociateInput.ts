import { InterviewFormat } from './InterviewFormat';

export interface AssociateInput {
    id: number;
    receivedNotifications: number;
    descriptionProvided: boolean;
    interviewFormat: InterviewFormat;
    proposedFormat: InterviewFormat;
}
