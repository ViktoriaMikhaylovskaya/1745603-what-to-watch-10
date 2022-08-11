import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';
import { AuthorizationStatus, AppRoute} from 'src/const';

export const actions = {
  setError: createAction<string | null>('film/setError'),
  redirectToRoute: createAction<AppRoute>('film/redirectToRoute'),
  setDataLoadedStatus: createAction<boolean>('data/setDataLoadedStatus'),
  requireAuthorization: createAction<AuthorizationStatus>('user/requireAuthorization'),

  loadPromoFilm: createAction<FilmInfo>('data/loadPromoFilm'),
};

type InitalState = {
  promoFilm: FilmInfo,

  authorizationStatus: AuthorizationStatus,
  error: string | null,
  isDataLoaded: boolean,
};

const startState: InitalState = {
  promoFilm: {} as FilmInfo,

  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(actions.requireAuthorization, (state, {payload}) => {
      state.authorizationStatus = payload;
    })
    .addCase(actions.setError, (state, {payload}) => {
      state.error = payload;
    })
    .addCase(actions.setDataLoadedStatus, (state, {payload}) => {
      state.isDataLoaded = payload;
    })
    .addCase(actions.loadPromoFilm, (state, {payload}) => {
      state.promoFilm = payload;
    });
});

export {reducer};
