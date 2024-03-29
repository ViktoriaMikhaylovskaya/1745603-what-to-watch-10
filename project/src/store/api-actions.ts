import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from 'src/types/state';
import { AuthData, UserData } from 'src/types/user-data';
import { actions } from './reducer';
import { actions as genreAction } from './genres/reducer';
import { actions as filmActions } from 'src/store/film/reducer';
import { actions as favoriteActions } from 'src/store/favorite-films/reducer';
import { actions as promoActions } from 'src/store/promo/reducer';
import { actions as errorActions } from 'src/store/error/reducer';
import { FilmInfo } from 'src/types/films';
import { Comment, AddComment } from 'src/types/comment';
import { AUTH_TOKEN_KEY_NAME } from 'src/services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from 'src/const';
import { store } from './';
import Token from 'src/services/token';

export const TIMEOUT_SHOW_ERROR = 5000;

export const clearErrorAction = createAsyncThunk(
  'film/clearError',
  () => {
    setTimeout(
      () => store.dispatch(errorActions.setError(null)),
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
  async (_arg, { dispatch, extra: api }) => {
    dispatch(actions.setDataLoadedStatus(true));
    const { data } = await api.get<FilmInfo[]>(APIRoute.Films);
    dispatch(genreAction.loadFilms(data));
    dispatch(actions.setDataLoadedStatus(false));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmInfo>(APIRoute.PromoFilm);
    dispatch(promoActions.loadPromoFilm(data));
  },
);

type SelectedFilm = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}

export const fetchSelectedFilmAction = createAsyncThunk<void, FilmInfo['id'], SelectedFilm>(
  'data/fetchSelectedFilm',
  async (filmId, { dispatch, extra: api, getState }) => {
    const state = getState();
    if (!state.film.isLoading) {
      dispatch(filmActions.fetch(filmId));
      const { data } = await api.get<FilmInfo>(`${APIRoute.Films}/${filmId}`);
      if (data) {
        dispatch(filmActions.success(data));
      } else {
        dispatch(filmActions.fail('Error!'));
      }
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/favoriteFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmInfo[]>(APIRoute.FavoriteFilms);
    dispatch(favoriteActions.favorite(data));
  },
);

export const addToFavoriteAction = createAsyncThunk<void, { id: number, status: boolean }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/addToFavorite',
  async ({ id, status }, { dispatch, extra: api, getState }) => {
    const state = getState();
    await api.post<FilmInfo[]>(`${APIRoute.FavoriteFilms}/${id}/${Number(status)}`);
    dispatch(fetchFavoriteFilmsAction());
    dispatch(filmActions.markAsFavorite(status));
    if (state.promo.promoFilm.id === id) {
      dispatch(promoActions.markAsFavorite(status));
    }
  }
);

export const fetchSimilarFilmAction = createAsyncThunk<void, FilmInfo['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilms',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmInfo[]>(`${APIRoute.Films}/${filmId}/similar`);
    dispatch(filmActions.similarFilms(data));
  }
);

export const fetchCommentAction = createAsyncThunk<void, FilmInfo['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCommentAction',
  async (filmId, { dispatch, extra: api, getState }) => {
    const state = getState();
    if (!state.film.comments.isLoading) {
      dispatch(filmActions.fetchComments(filmId));
      try {
        const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${filmId}`);
        if (data) {
          dispatch(filmActions.fetchCommentsSuccess(data));
        } else {
          throw new Error('Error.');
        }
      } catch (error) {
        const err = error instanceof Error ? error.message : error as string;
        dispatch(filmActions.fetchCommentsFail(err));
        store.dispatch(errorActions.setError(err));
      }
    }
  }
);

export const addCommentAction = createAsyncThunk<void, AddComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addCommentAction',
  async ({ comment, rating, filmId }, { dispatch, extra: api, getState }) => {
    const state = getState();
    if (!state.film.addComment.isLoading) {
      dispatch(filmActions.addComment({ comment, rating, filmId }));
      try {
        const { data } = await api.post<Comment[]>(`${APIRoute.Comments}/${filmId}`, { comment, rating });
        if (data) {
          dispatch(filmActions.addCommentSuccess(data));
        } else {
          throw new Error('Error.');
        }
      } catch (error) {
        const err = error instanceof Error ? error.message : error as string;
        dispatch(filmActions.addCommentFail(err));
        store.dispatch(errorActions.setError(err));
      }
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(AppRoute.SignIn);
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
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(AppRoute.SignIn, { email, password });
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
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    Token.remove(AUTH_TOKEN_KEY_NAME);
    dispatch(actions.requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
