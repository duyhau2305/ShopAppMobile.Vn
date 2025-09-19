import {ClientParams} from './client';
import {RecruiterParams} from './recruiter';

export interface UserParams {
  id: number;
  name: string;
  email?: string;
  username: string;
  phone: string;
}

export interface EmployeeParams {
  id: number;
  employee_code: string;
  user_id: number;
  full_name: string;
  phone_number: string;
  address: string;
  avatar: string;
  before_card_id: string;
  after_card_id: string;
  recruiter: RecruiterParams;
  customer: ClientParams;
  personal_salary?: number;
  employee_role_id: number;
  bank_name?: string;
  bank_id?: number;
  bank_account_number?: string;
  is_black_list: number;
  status: number;
  cccd: string;
}
