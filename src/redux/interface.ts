import {EmployeeParams, UserParams} from '../interfaces/auth';
import {BankParams} from '../interfaces/bank';
import {ClientParams} from '../interfaces/client';
import {CollaboratorParams} from '../interfaces/collaborator';
import {PaginationParams} from '../interfaces/common';
import {ConfigWifiParams} from '../interfaces/configWifi';
import {NotificationParams} from '../interfaces/notification';
import {RecruiterParams} from '../interfaces/recruiter';
import {RequestParams} from '../interfaces/request';
import {ShiftTimeKeepingParams} from '../interfaces/shift';
import {TakeOffParams} from '../interfaces/takeOff';
import {WorkTypeParams} from '../interfaces/workType';

export interface CommonState {
  openLoading: boolean;
  openSuccess: boolean;
  titleSuccess?: string;
  openToast: boolean;
  titleToast?: string;
  fontSize: string;
  openWarningTimekeeping: boolean;
  openNoti: boolean;
  notiTitle?: string;
}

export interface SendWifiState {
  open: boolean;
  type: string;
}

export interface InfoState {
  activeWifi: number;
  activeLocation: number;
  activeInternal: number;
}

export interface TimekeepingState {
  shift?: ShiftTimeKeepingParams;
  status_check_in: number;
}

export interface RegisterState {
  username: string;
  password: string;
  full_name: string;
  phone_number: string;
  employee_code: string;
  address: string;
  client?: ClientParams;
  recruiter?: RecruiterParams;
  employee_role?: WorkTypeParams;
  bank?: BankParams;
  bank_account_number: string;
  bank_name: string;
  before_card_id: string;
  after_card_id: string;
  avatar: string;
  cccd: string;
  birthday: string;
}

export interface AuthState {
  access_token?: string;
  refresh_token?: string;
  user: UserParams;
  employee?: EmployeeParams;
  role: {
    role_id: number;
    role_name: string;
  };
  fcmToken?: string;
}

export interface CollaboratorState {
  listCollaborator: CollaboratorParams[];
  pagination: PaginationParams;
}

export interface NotificationState {
  listNotification: NotificationParams[];
  pagination: PaginationParams;
  totalUnRead: number;
}

export interface TakeOffState {
  listTakeOff: TakeOffParams[];
  filter: {
    type?: number;
    status?: number;
  };
  pagination: PaginationParams;
}

export interface RequestState {
  listRequest: RequestParams[];
  pagination: PaginationParams;
}

export interface ConfigWifiState {
  listConfig: ConfigWifiParams[];
  pagination: PaginationParams;
}

export interface TimerState {
  endTime?: string;
}
