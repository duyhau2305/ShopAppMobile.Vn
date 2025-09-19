import {Platform} from 'react-native';
import TouchID from 'react-native-touch-id';

type BiometricOK = {
  ok: true;
  type: 'FaceID' | 'TouchID' | 'Fingerprint' | 'Unknown';
};
type BiometricFail = {
  ok: false;
  reason:
    | 'ios_only'
    | 'min_version'
    | 'not_available'
    | 'not_enrolled'
    | 'passcode_not_set'
    | 'user_cancel'
    | 'system_cancel'
    | 'auth_failed'
    | 'lockout'
    | 'error';
  message?: string;
};
export type BiometricResult = BiometricOK | BiometricFail;

const CONFIG = {
  title: 'Xác thực để chấm công',
  cancelText: 'Huỷ',
  fallbackLabel: 'Dùng mật mã', // iOS: hiện nút passcode
  unifiedErrors: true,
  passcodeFallback: true, // iOS: cho phép nhập passcode thiết bị
} as const;

export async function authIOS(
  prompt = 'Xác thực Face ID để chấm công',
): Promise<BiometricResult> {
  if (Platform.OS !== 'ios') {
    return {ok: false, reason: 'ios_only'};
  }

  const major = Number(String(Platform.Version).split('.')[0]);
  if (Number.isFinite(major) && major < 14) {
    return {ok: false, reason: 'min_version'};
  }

  try {
    const supported = await TouchID.isSupported(CONFIG);
    const type =
      typeof supported === 'string'
        ? (supported as BiometricOK['type'])
        : 'Unknown';

    // 🚫 Nếu không phải FaceID thì coi như không hỗ trợ
    if (type !== 'FaceID') {
      return {
        ok: false,
        reason: 'not_available',
        message: 'Thiết bị không hỗ trợ Face ID',
      };
    }

    await TouchID.authenticate(prompt, CONFIG);
    return {ok: true, type: 'FaceID'};
  } catch (e: any) {
    const err = e;
    switch (err?.code) {
      case 'NOT_SUPPORTED':
      case 'NOT_AVAILABLE':
        return {
          ok: false,
          reason: 'not_available',
          message: 'Thiết bị không hỗ trợ Face ID',
        };
      case 'NOT_ENROLLED':
        return {ok: false, reason: 'not_enrolled'};
      case 'PASSCODE_NOT_SET':
        return {ok: false, reason: 'passcode_not_set'};
      case 'USER_CANCELED':
        return {ok: false, reason: 'user_cancel'};
      case 'SYSTEM_CANCELED':
        return {ok: false, reason: 'system_cancel'};
      case 'AUTHENTICATION_FAILED':
        return {ok: false, reason: 'auth_failed'};
      case 'LOCKOUT':
        return {ok: false, reason: 'lockout'};
      default:
        return {
          ok: false,
          reason: 'error',
          message: err?.message || String(err),
        };
    }
  }
}

export async function checkFaceIDIOS(): Promise<boolean> {
  // 1) Chỉ iOS
  if (Platform.OS !== 'ios') {
    return false;
  }

  // 2) iOS >= 16
  const major = parseInt(String(Platform.Version).split('.')[0], 10);
  if (!Number.isFinite(major) || major < 16) {
    return false;
  }

  // 3) Có hỗ trợ FaceID
  try {
    const supported = await TouchID.isSupported({unifiedErrors: true});
    const type = typeof supported === 'string' ? supported : 'Unknown';
    return type === 'FaceID';
  } catch {
    // Không hỗ trợ sinh trắc hoặc lỗi bất kỳ -> coi như không hỗ trợ FaceID
    return false;
  }
}
