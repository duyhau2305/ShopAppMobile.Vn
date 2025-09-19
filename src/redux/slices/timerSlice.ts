import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, rootStore} from '../store';
import {resetTimekeepingState} from './timekeepingSlice';
import {TimerState} from '../interface';
import {setModalWarningTimekeeping} from './commonSlice';

const initialState = {
  endTime: undefined,
} as TimerState;

let intervalRef: NodeJS.Timeout | null = null;

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setEndTime(state, action) {
      state.endTime = action.payload;
    },
    resetTimer() {
      return initialState;
    },
  },
});

export const {setEndTime, resetTimer} = timerSlice.actions;

export const startCountdown = (end: string) => (dispatch: AppDispatch) => {
  if (intervalRef) {
    clearInterval(intervalRef);
  }
  dispatch(setEndTime(end));
  const updateTimer = () => {
    const now = new Date();
    const [timeStr, dateStr] = end.split(' ');
    const [endHour, endMinute] = timeStr.split(':').map(Number);
    const [year, month, day] = dateStr.split('-').map(Number);

    const endTime = new Date(year, month - 1, day, endHour, endMinute);

    const diff = endTime.getTime() - now.getTime();
    if (diff < 0) {
      if (intervalRef) {
        clearInterval(intervalRef);
      }
      dispatch(resetTimer());
      dispatch(resetTimekeepingState());
      if (rootStore.getState()?.auth?.role?.role_id !== 5) {
        dispatch(setModalWarningTimekeeping(true));
      }
    } else {
      const hours = Math.floor(diff / (1000 * 60 * 60)); // số giờ
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // số phút còn lại
      console.log(`Còn lại: ${hours} giờ ${minutes} phút`);
    }
  };
  updateTimer();
  intervalRef = setInterval(updateTimer, 5 * 1000);
};

export const clearTimer = () => {
  if (intervalRef) {
    clearInterval(intervalRef);
  }
  return resetTimer();
};

export default timerSlice.reducer;
