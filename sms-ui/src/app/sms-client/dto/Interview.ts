import { InterviewClient } from './InterviewClient';
import { InterviewFeedback } from './InterviewFeedback';
import { AssociateInput } from './AssociateInput';

export interface Interview {
    id: number;
    managerEmail: string;
    associateEmail: string;
    scheduled: number;
    notified: number;
    reviewed: number;
    place: string;
    feedback: InterviewFeedback;
    associateInput: AssociateInput;
    client: InterviewClient;
}
