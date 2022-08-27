export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Review = 'review',
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

  Logout = '/logout',

  Comments = '/comments',
}

export enum DurationTemplate {
  MinutesSeconds = 'm[:] s',
  HoursMinutesSeconds = 'H[:] m[:] s',
  HoursMinutes = 'H[h] m[m]'
}

export enum TimeMetric {
  Second = 'seconds',
  Minute = 'minutes',
}

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
