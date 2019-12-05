import {PrimaryAccount} from './primaryAccount';
import {SavingsAccount} from './savingsAccount';
import {Appointment} from './appointment';
import {Recipient} from './recipient';

export class user {
  name: string;
  userId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enabled:boolean;
  primaryAccount : PrimaryAccount;
  savingsAccount: SavingsAccount;
  appointmentList: Appointment[] ;
  recipientList: Recipient[];
  tableau: number[];
}
