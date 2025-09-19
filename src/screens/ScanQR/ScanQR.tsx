import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import {GradientBackground, HeaderBack, TextDisplay} from '../../components';
import sty from '../../themes/sty';
import {parseQRCodeContent} from '../../utils/scan';
import IMAGES from '../../assets/images';
import {handleErrorMessage} from '../../utils/helpers';
import {getQREmployeeCodeAPI} from '../../apis/auth';

import ResultScan from './components/ResultScan';
import {useAppDispatch} from '../../redux/hooks';
import {setModalLoading} from '../../redux/slices/commonSlice';

const ScanQR = () => {
  const devices = useCameraDevices();
  const device = devices?.[0];
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<{
    avatar: string;
    employee_code: string;
    full_name: string;
    id: number;
  }>();

  const [plash, setPlash] = useState<'on' | 'off'>('off');
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [locked, setLocked] = useState<boolean>(false); // khoá khi đã đọc 1 lần
  const lastValueRef = useRef<string>('');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setAuthorized(status === 'granted');
    })();
  }, []);

  const onScanned = useCallback(
    async (codes: {value?: string}[]) => {
      if (locked || !codes?.length) {
        return;
      }
      const raw = (codes[0]?.value ?? '').trim();
      if (!raw) {
        return;
      }
      // Chống quét lặp nhiều frame
      if (raw === lastValueRef.current) {
        return;
      }
      lastValueRef.current = raw;

      // Parse & khoá lại
      try {
        dispatch(setModalLoading(true));
        const parsed = parseQRCodeContent(raw);
        setLocked(true);
        Vibration.vibrate(50);
        console.log('parsed: ', parsed);

        if (parsed?.raw) {
          const res = await getQREmployeeCodeAPI(parsed?.raw);
          console.log('Get QR Code: ', res?.data?.data);
          setEmployeeData(res?.data?.data);
          setOpen(true);
        }
        dispatch(setModalLoading(false));
      } catch (error) {
        dispatch(setModalLoading(false));
        handleErrorMessage(error);
        setLocked(false);
      }
    },
    [dispatch, locked],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'pdf-417'],
    onCodeScanned: onScanned,
  });


  const handleScanDone = () => {
    setLocked(false);
    lastValueRef.current = '';
  };

  return (
    <GradientBackground>
      <View style={[sty.relative, sty.flex_1]}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={!locked}
          codeScanner={codeScanner}
          torch={plash}
        />
        <View style={sty.bg_white}>
          <HeaderBack
            title="Quét mã chấm công"
            RightIcon={
              <TouchableOpacity
                onPress={() => setPlash(prev => (prev === 'on' ? 'off' : 'on'))}
                style={[sty.p_8, sty.bg_white, sty.rounded_full]}>
                <Image
                  style={[sty.w_20, sty.h_20, sty.objectScaleDown]}
                  source={
                    plash === 'on'
                      ? IMAGES.HOME.icon_flash_scan
                      : IMAGES.HOME.icon_off_plash
                  }
                />
              </TouchableOpacity>
            }
          />
        </View>
        <View
          style={[sty.flex_1, sty.justifyCenter, sty.itemsCenter]}
          pointerEvents="none">
          {/* 4 vùng che mờ */}
          <View style={styles.OverlayTop} />
          <View style={styles.OverlayRight} />
          <View style={styles.Frame} />
          <View style={styles.OverlayLeft} />
          <View style={styles.OverlayBottom} />
          <View style={styles.Subtitle}>
            <TextDisplay
              color="#fff"
              text="Đặt mã QR trên vé vào khung để thực hiện check-in"
              fontWeight="semibold"
              textAlign="center"
              fontSize={16}
              lineHeight={24}
            />
          </View>
        </View>
      </View>
      <ResultScan
        open={open}
        setOpen={setOpen}
        handleScanDone={handleScanDone}
        employee={employeeData}
      />
    </GradientBackground>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  Frame: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    top: '15%',
    left: '12.5%',
    right: '12.5%',
    height: '50%',
  },
  Subtitle: {
    position: 'absolute',
    bottom: '25%',
    padding: 16,
  },
  OverlayTop: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.45)',
    top: 0,
    left: 0,
    right: 0,
    height: '15%',
  },
  OverlayRight: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.45)',
    top: '15%',
    left: 0,
    right: '87.5%',
    height: '50%',
  },
  OverlayLeft: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.45)',
    top: '15%',
    left: '87.5%',
    right: 0,
    height: '50%',
  },
  OverlayBottom: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.45)',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
  },
});
