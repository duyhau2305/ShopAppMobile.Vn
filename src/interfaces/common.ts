import { StyleProp, ViewStyle } from 'react-native';

export interface IconSVGProps {
  width?: number;
  height?: number;
  color?: string;
  styles?: StyleProp<ViewStyle>;
}
export interface FontFamily {
  Inter_Light: string;
  Inter_Regular: string;
  Inter_Medium: string;
  Inter_SemiBold: string;
  Inter_Bold: string;
  Lora_Regular: string;
  Lora_Medium: string;
  Lora_SemiBold: string;
  Lora_Bold: string;
}

export interface PaginationParams {
  count: number;
  current_page: number;
  last_page: number;
  total: number;
}
