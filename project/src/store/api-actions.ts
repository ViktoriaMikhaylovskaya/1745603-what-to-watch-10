import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from 'src/types/state';
import {AuthData, UserData} from 'src/types/user-data';
import {actions} from './reducer';
import {FilmInfo} from 'src/types/films';
import {APIRoute, AuthorizationStatus} from 'src/const';
import {saveToken, dropToken} from 'src/services/token';
import {store} from './';

export const TIMEOUT_SHOW_ERROR = 5000;

export const clearErrorAction = createAsyncThunk(
  'film/clearError',
  () => {
    setTimeout(
      () => store.dispatch(actions.setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmInfo[]>(APIRoute.Films);
    dispatch(actions.setDataLoadedStatus(true));
    dispatch(actions.loadFilms(data));
    dispatch(actions.setDataLoadedStatus(false));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmInfo>(APIRoute.PromoFilm);
    dispatch(actions.loadPromoFilm(data));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(actions.requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(actions.requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(actions.requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(actions.requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
