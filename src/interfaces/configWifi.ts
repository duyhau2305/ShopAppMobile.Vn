export interface ItemWifiParams {
  id: number;
  bssid_ip: string;
  ssid: string;
  type: string;
  is_active: number;
}

export interface ConfigWifiParams {
  id: number;
  name: string;
  address: string;
  wifi_locations: ItemWifiParams[];
}
