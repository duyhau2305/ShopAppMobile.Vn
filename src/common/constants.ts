import {PaginationParams} from '../interfaces/common';

export const DAYS_OF_WEEKS = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

export const PAGINATION_DEFAULT = {
  count: 0,
  current_page: 1,
  last_page: 1,
  total: 0,
} as PaginationParams;

export const LIST_STATUS_TAKE_OFF = [
  {
    status: 1,
    label: 'Chờ phê duyệt',
    color: '#F2B71D',
    background: '#FDE9CE',
  },
  {
    status: 2,
    label: 'Đã phê duyệt',
    color: '#26A45E',
    background: '#D5F5E3',
  },
  {
    status: 3,
    label: 'Đã từ chối',
    color: '#FF4D4F',
    background: '#FFDBDC',
  },
];

export const LIST_TYPE_TAKE_OFF = [
  {
    type: 1,
    label: 'Xin nghỉ phép',
  },
  {
    type: 2,
    label: 'Xin nghỉ việc',
  },
];

export const LIST_STATUS_COLLABORATOR = [
  {
    status: 1,
    label: 'Chờ phê duyệt',
    color: '#F2B71D',
    background: '#FDE9CE',
  },
  {
    status: 2,
    label: 'Đã phê duyệt',
    color: '#26A45E',
    background: '#D5F5E3',
  },
  {
    status: 3,
    label: 'Đã từ chối',
    color: '#FF4D4F',
    background: '#FFDBDC',
  },
];
