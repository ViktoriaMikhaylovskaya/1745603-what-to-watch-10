export const AUTH_TOKEN_KEY_NAME = 'what-to-watch-token';
export type Tokensave = string;

export const keys = ['what-to-watch-token'] as const;
export type KeyType = typeof keys[number];

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
