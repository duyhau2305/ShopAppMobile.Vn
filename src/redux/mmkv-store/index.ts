import {MMKV} from 'react-native-mmkv';

const REDUX_STORAGE = new MMKV();

const mmkvStorage = {
  setItem: (key: string, value: string | number | boolean | Uint8Array) => {
    REDUX_STORAGE.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = REDUX_STORAGE.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    REDUX_STORAGE.delete(key);
    return Promise.resolve();
  },
  clearAll: () => {
    REDUX_STORAGE.clearAll();
  },
};

export default mmkvStorage;
