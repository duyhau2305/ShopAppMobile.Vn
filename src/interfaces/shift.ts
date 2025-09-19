export interface ShiftParams {
  id: number;
  type: string;
  name: string;
  time_start: string;
  time_end: string;
}

export interface ShiftTimeKeepingParams {
  id: number;
  name: string;
  time_end: string;
  time_start: string;
  check_in_input: number;
  check_out_input: number;
}
