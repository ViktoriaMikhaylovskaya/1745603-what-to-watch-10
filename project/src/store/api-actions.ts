import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from 'src/types/state';
import {AuthData, UserData} from 'src/types/user-data';
import {actions} from './reducer';
import {FilmInfo} from 'src/types/films';
import {Comment, AddComment} from 'src/types/comment';
import {AUTH_TOKEN_KEY_NAME} from 'src/services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from 'src/const';
import Token from 'src/services/token';
import {store} from './';
import {actions as filmActions} from 'src/store/film/reducer';

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
    dispatch(actions.setDataLoadedStatus(true));
    const {data} = await api.get<FilmInfo[]>(APIRoute.Films);
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

type SelectedFilm = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}

export const fetchSelectedFilmAction = createAsyncThunk<void, FilmInfo['id'], SelectedFilm>(
  'data/fetchSelectedFilm',
  async (filmId, {dispatch, extra: api, getState}) => {
    const state = getState();
    if (!state.film.isLoading) {
      dispatch(filmActions.fetch(filmId));
      const {data} = await api.get<FilmInfo>(`${APIRoute.Films}/${filmId}`);
      if(data) {
        dispatch(filmActions.success(data));
      } else {
        dispatch(filmActions.fail('Error!'));
      }
    }
  },
);

export const fetchSimilarFilmAction = createAsyncThunk<void, FilmInfo['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmInfo[]>(`${APIRoute.Films}/${filmId}/similar`);
    dispatch(filmActions.similarFilms(data));
  }
);

export const fetchCommentction = createAsyncThunk<void, FilmInfo['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentction',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${filmId}`);
    dispatch(filmActions.comments(data));
  }
);

export const addCommentction = createAsyncThunk<void, AddComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addCommentction',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    if(AuthorizationStatus.Auth) {
      dispatch(actions.redirectToRoute(AppRoute.Film));
      dispatch(filmActions.comments(data));
    }
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
    Token.save(AUTH_TOKEN_KEY_NAME, token);
    dispatch(actions.requireAuthorization(AuthorizationStatus.Auth));
    dispatch(actions.redirectToRoute(AppRoute.MyList));
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
    Token.remove(AUTH_TOKEN_KEY_NAME);
    dispatch(actions.requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
