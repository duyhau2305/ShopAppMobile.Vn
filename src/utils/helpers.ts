import 'react-native-get-random-values';
import {Alert} from 'react-native';
import {setToast} from '../redux/slices/commonSlice';
import {rootStore} from '../redux/store';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import {DAYS_OF_WEEKS} from '../common/constants';
import dayjs from 'dayjs';
import {FONT_FAMILY} from '../themes/fontFamily';
import 'moment/locale/vi';
import {DEFAULT_MESSAGES} from './statusCode';

moment.locale('vi');

const countDecimals = (value: number) => {
  if (!value) {
    return 0;
  }
  if (value % 1 !== 0) {
    return value?.toString()?.split('.')[1]?.length;
  }
  return 0;
};
export const formatPrice = (value: number, round = 0, division = ',') => {
  if (value !== 0 && !value) {
    return '';
  }
  const count = countDecimals(value);
  if (!round || !count) {
    return `${value?.toFixed(round)}`?.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      division,
    );
  } else {
    return `${value?.toFixed(round)}`?.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
};

export const showUnknownError = (message?: string) =>
  rootStore.dispatch(
    setToast({
      open: true,
      title: message || 'Có lỗi xảy ra vui lòng thử lại.',
    }),
  );

export const handleErrorMessage = (
  error: any,
  custom?: Partial<Record<number, string>>,
  messageDefaul?: string,
) => {
  const status = error?.status;
  if (error?.status) {
    const message = custom?.[status] || DEFAULT_MESSAGES[status];
    if (message) {
      return rootStore.dispatch(
        setToast({
          open: true,
          title: message || messageDefaul || 'Có lỗi xảy ra vui lòng thử lại.',
        }),
      );
    } else {
      return showUnknownError(messageDefaul);
    }
  } else {
    showUnknownError(messageDefaul);
  }
};

export const handleErrorSheet = (
  error: any,
  setToastSheet: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      title: string;
    }>
  >,
) => {
  if (error?.response?.data?.message) {
    setToastSheet({
      open: true,
      title: error?.response?.data?.message,
    });
  } else {
    setToastSheet({
      open: true,
      title: 'Có lỗi xảy ra vui lòng thử lại',
    });
  }
};

export const parseTimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const generateUniqueId = () => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const uuid = uuidv4().split('-')[0];
  return `${timestamp}-${uuid}`;
};

export const removeVietnameseTones = (str: string) => {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return str;
};

export const copyText = (text: string) => {
  Clipboard.setString(text);
  Alert.alert('Đã sao chép');
};

export const getDayOfWeek = (dateStr: string) => {
  const dayIndex = dayjs(dateStr).day();
  return DAYS_OF_WEEKS[dayIndex];
};

export const getFontSize = (
  level: string,
  fontSize: number,
  lineHeight: number,
) => {
  switch (level) {
    case 'mini':
      return {
        fontSize,
        lineHeight,
      };
    case 'normal':
      return {
        fontSize: fontSize + 2,
        lineHeight: lineHeight + 4,
      };
    case 'big':
      return {
        fontSize: fontSize + 4,
        lineHeight: lineHeight + 8,
      };
    case 'largest':
      return {
        fontSize: fontSize + 6,
        lineHeight: lineHeight + 12,
      };
  }
};

export const getFontFamilyInter = (
  fontWeight: 'bold' | 'semibold' | 'medium' | 'regular' | 'light' | undefined,
) => {
  switch (fontWeight) {
    case 'bold':
      return FONT_FAMILY.Inter_Bold;
    case 'semibold':
      return FONT_FAMILY.Inter_SemiBold;
    case 'medium':
      return FONT_FAMILY.Inter_Medium;
    case 'regular':
      return FONT_FAMILY.Inter_Regular;
    case 'light':
      return FONT_FAMILY.Inter_Light;
    default:
      return FONT_FAMILY.Inter_Regular;
  }
};

export const getFontFamilyLora = (
  fontWeight: 'bold' | 'semibold' | 'medium' | 'regular' | 'light' | undefined,
) => {
  switch (fontWeight) {
    case 'bold':
      return FONT_FAMILY.Lora_Bold;
    case 'semibold':
      return FONT_FAMILY.Lora_SemiBold;
    case 'medium':
      return FONT_FAMILY.Lora_Medium;
    case 'regular':
      return FONT_FAMILY.Lora_Regular;
    default:
      return FONT_FAMILY.Lora_Regular;
  }
};

export const formatLatitude = (latitude: number) => {
  const direction = latitude >= 0 ? 'N' : 'S';
  const absVal = Math.abs(latitude);
  const degrees = Math.floor(absVal);
  const minutesFull = (absVal - degrees) * 60;
  const minutes = Math.floor(minutesFull);
  const seconds = ((minutesFull - minutes) * 60).toFixed(2);

  return `${degrees}°${minutes}'${seconds}" ${direction}`;
};

export const formatLongitude = (longitude: number) => {
  const direction = longitude >= 0 ? 'E' : 'W';
  const absVal = Math.abs(longitude);
  const degrees = Math.floor(absVal);
  const minutesFull = (absVal - degrees) * 60;
  const minutes = Math.floor(minutesFull);
  const seconds = ((minutesFull - minutes) * 60).toFixed(2);

  return `${degrees}°${minutes}'${seconds}" ${direction}`;
};

export const formatTime = (value: string, format: string = 'HH:mm') =>
  moment(value, format).format(format);

export const addMinutesToDateTime = (
  datetimeStr: string,
  minutesToAdd: number,
): string => {
  // Tách thời gian và ngày
  const [timeStr, dateStr] = datetimeStr.split(' ');
  const [hours, minutes] = timeStr.split(':').map(Number);
  const [year, month, day] = dateStr.split('-').map(Number);

  // Tạo đối tượng Date
  const dateObj = new Date(year, month - 1, day, hours, minutes);

  // Cộng thêm số phút
  dateObj.setMinutes(dateObj.getMinutes() + minutesToAdd);

  // Định dạng lại kết quả
  const newHours = String(dateObj.getHours()).padStart(2, '0');
  const newMinutes = String(dateObj.getMinutes()).padStart(2, '0');
  const newYear = dateObj.getFullYear();
  const newMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
  const newDay = String(dateObj.getDate()).padStart(2, '0');

  return `${newHours}:${newMinutes} ${newYear}-${newMonth}-${newDay}`;
};

export const formatNotifyTime = (hhmm: string, ddmmyyyy: string): string => {
  // Ghép chuỗi thành dạng mà moment hiểu: DD/MM/YYYY HH:mm
  const input = `${ddmmyyyy} ${hhmm}`;
  const target = moment(input, 'DD/MM/YYYY HH:mm');
  if (!target.isValid()) {
    return `${hhmm} ${ddmmyyyy}`;
  }
  const now = moment();
  const diffSec = now.diff(target, 'seconds');
  // Nếu thời điểm ở tương lai → hiển thị tuyệt đối
  if (diffSec < 0) {
    return target.format('HH:mm DD/MM/YYYY');
  }
  if (diffSec < 60) {
    return `${diffSec} giây trước`;
  }
  const diffMin = now.diff(target, 'minutes');
  if (diffMin < 60) {
    return `${diffMin} phút trước`;
  }
  const diffHour = now.diff(target, 'hours');
  if (diffHour < 24) {
    return `${diffHour} giờ trước`;
  }
  const diffDay = now.diff(target, 'days');
  if (diffDay <= 6) {
    return `${diffDay} ngày trước`;
  }
  // > 6 ngày thì format tuyệt đối
  return target.format('HH:mm DD/MM/YYYY');
};

export const validateCCCD = (raw: string): boolean => {
  try {
    const parts = raw.split('|');
    // Phải có ít nhất 7 trường
    if (parts.length < 7) {
      return false;
    }
    const id = parts[0];
    const fullName = parts[2];
    const dob = parts[3];
    const gender = parts[4];
    const address = parts[5];
    const issueDate = parts[6];
    // Check số định danh: 12 chữ số
    if (!/^\d{12}$/.test(id)) {
      return false;
    }
    // Check ngày sinh & ngày cấp: ddMMyyyy
    if (!/^\d{8}$/.test(dob) || !/^\d{8}$/.test(issueDate)) {
      return false;
    }
    // Check giới tính
    if (!['Nam', 'Nữ'].includes(gender)) {
      return false;
    }
    // Check tên không rỗng
    if (!fullName?.trim()) {
      return false;
    }
    // Check địa chỉ không rỗng
    if (!address?.trim()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const formatBirthDayCCCD = (dateStr: string): string => {
  if (!/^\d{8}$/.test(dateStr)) {
    return dateStr;
  }
  const day = dateStr.substring(0, 2);
  const month = dateStr.substring(2, 4);
  const year = dateStr.substring(4, 8);
  return `${day}/${month}/${year}`;
};

export const convertDDMMYYYYToISO = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) {
    return dateStr;
  }
  return `${year}-${month}-${day}`;
};
