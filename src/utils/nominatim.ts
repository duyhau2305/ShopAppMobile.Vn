import {setToast} from '../redux/slices/commonSlice';
import {rootStore} from '../redux/store';

export const getAddressFromLonLat = async (
  longitude: number,
  latitude: number,
  opts = {} as any,
) => {
  const {
    zoom = 18, // độ chi tiết (0-18)
    timeoutMs = 10000, // timeout 10s
    userAgent = 'https://vietapp.vn', // nên điền app/email để tránh bị chặn
  } = opts;

  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: 'jsonv2',
    addressdetails: '1',
    zoom: String(zoom),
    'accept-language': 'vi', // yêu cầu trả về tiếng Việt
  });

  const url = `https://nominatim.openstreetmap.org/reverse?${params.toString()}`;

  // Tạo race timeout để tránh treo
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout khi gọi Nominatim')), timeoutMs),
  );

  const fetchPromise = fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
    },
  }).then(async res => {
    const data = await res.json();
    // data.display_name thường đã là chuỗi địa chỉ “đọc được”
    if (data?.display_name) {
      return data.display_name;
    }
    return 'Không tìm thấy địa chỉ';
  });

  try {
    const address = await Promise.race([fetchPromise, timeoutPromise]);
    return address;
  } catch (err: any) {
    rootStore.dispatch(
      setToast({
        open: true,
        title: 'Có lỗi xảy ra khi lấy địa chỉ',
      }),
    );
    return 'Không tìm thấy địa chỉ';
  }
};
