import { User } from './User';
import { Address } from 'cluster';

export interface Cohort {
<<<<<<< HEAD
  cohortName(cohortName: any);
=======
>>>>>>> c98d41d58324e10611ddca80257ea2fc88c0705b
    cohortId: number;
    CName: string;
    address: Address;
    Token: string;
    StartD: string;
    EndD: string;
    trainer: User;
    coTrainer: User;
    Email: string;
}