import dayjs from 'dayjs';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Review = '/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
  SimilarFilms = '/similar',
  Review = '/review',

  FavoriteFilms = '/favorite',
  StatusFaviriteFilm = '/favorite/{filmId}/{status}',

  Login = '/login',
  Logout = '/logout',

  Comments = '/comments',
}

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const humanizeDueDate = (date: string) => dayjs(date).format('MMMM D, YYYY');
