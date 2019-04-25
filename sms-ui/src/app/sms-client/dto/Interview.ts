import { InterviewClient } from './InterviewClient';

export interface Interview {
    id: number;
    managerEmail: string;
    associateEmail: string;
    scheduled: number;
    notified: number;
    reviewed: number;
    place: string;
    feedback: object;
    associateInput: object;
    client: InterviewClient;
}
