import {KeyType} from 'src/types/token';

class Token {
  static get(key: KeyType) {
    const token = localStorage.getItem(key);
    return token ?? '';
  }

  static save(key: KeyType, value: string) {
    return localStorage.setItem(key, value );
  }

  static remove(key: KeyType) {
    return localStorage.removeItem(key);
  }
}

export default Token;
