export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Review = '/films/:id/review',
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

  Film = '/films/{filmId}',
  SimilarFilms = '/films/{filmId}/similar',
  FavoriteFilms = '/favorite',
  StatusFaviriteFilm = '/favorite/{filmId}/{status}',

  Login = '/login',
  Logout = '/logout',

  Comments = '/comments/{filmId}',
  AddComment = '/comments/{filmId}',
}

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
