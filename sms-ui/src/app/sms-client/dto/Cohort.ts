import { User } from './User';
import { Address } from 'cluster';

export interface Cohort {
    cohortId: number;
    cohortName: string;
    address: Address;
    cohortToken: string;
    startDate: string;
    endDate: string;
    trainer: User;
    coTrainer: User;
    Email: string;
}