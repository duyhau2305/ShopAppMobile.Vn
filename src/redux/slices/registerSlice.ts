import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RegisterState} from '../interface';
import {ClientParams} from '../../interfaces/client';
import {RecruiterParams} from '../../interfaces/recruiter';
import {WorkTypeParams} from '../../interfaces/workType';
import {BankParams} from '../../interfaces/bank';

const initialState = {
  username: '',
  password: '',
  phone_number: '',
  full_name: '',
  employee_code: '',
  address: '',
  client: undefined,
  recruiter: undefined,
  employee_role: undefined,
  bank: undefined,
  bank_account_number: '',
  bank_name: '',
  before_card_id: '',
  after_card_id: '',
  avatar: '',
  cccd: '',
  birthday: '',
} as RegisterState;

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setFullName(state, action: PayloadAction<string>) {
      state.full_name = action.payload;
    },
    setPassWord(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phone_number = action.payload;
    },
    setEmployeeCode(state, action: PayloadAction<string>) {
      state.employee_code = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setClient(state, action: PayloadAction<ClientParams>) {
      state.client = action.payload;
    },
    setRecruiter(state, action: PayloadAction<RecruiterParams | undefined>) {
      state.recruiter = action.payload;
    },
    setEmployeeRole(state, action: PayloadAction<WorkTypeParams>) {
      state.employee_role = action.payload;
    },
    setBank(state, action: PayloadAction<BankParams>) {
      state.bank = action.payload;
    },
    setBankAccountNumber(state, action: PayloadAction<string>) {
      state.bank_account_number = action.payload;
    },
    setBankName(state, action: PayloadAction<string>) {
      state.bank_name = action.payload;
    },
    setBeforeCardId(state, action: PayloadAction<string>) {
      state.before_card_id = action.payload;
    },
    setAfterCardId(state, action: PayloadAction<string>) {
      state.after_card_id = action.payload;
    },
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
    setCccd(state, action: PayloadAction<string>) {
      state.cccd = action.payload;
    },
    setBirthday(state, action: PayloadAction<string>) {
      state.birthday = action.payload;
    },
    resetRegisterState() {
      return initialState;
    },
  },
});

export const {
  setUsername,
  setPassWord,
  setPhoneNumber,
  setEmployeeCode,
  setAddress,
  setClient,
  setRecruiter,
  setEmployeeRole,
  setBank,
  setBankAccountNumber,
  setBankName,
  setBeforeCardId,
  setAfterCardId,
  setAvatar,
  setCccd,
  resetRegisterState,
  setFullName,
  setBirthday,
} = registerSlice.actions;

export default registerSlice.reducer;
