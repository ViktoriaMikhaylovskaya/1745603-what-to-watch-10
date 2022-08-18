import { createReducer, createAction } from '@reduxjs/toolkit';
import { Comment } from 'src/types/comment';
import { FilmInfo } from 'src/types/films';

export const actions = {
  fetch: createAction<FilmInfo['id']>('film/fetch'),
  fail: createAction<string>('film/fail'),
  success: createAction<FilmInfo>('film/success'),

  similarFilms: createAction<FilmInfo[]>('film/similarFilms'),

  comments: createAction<Comment[]>('film/comment'),
};

export type InitalState = {
  data: FilmInfo | null,
  isLoading: boolean,
  error: string | null,
  similarFilms: FilmInfo[],
  comments: Comment[],
};

const initalState: InitalState = {
  data: null,
  isLoading: false,
  error: null,
  similarFilms: [],
  comments: [],
};

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(actions.fetch, (state, {payload}) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(actions.fail, (state, {payload}) => {
      state.error = payload;
      state.isLoading = false;
    })
    .addCase(actions.success, (state, {payload}) => {
      state.isLoading = false;
      state.data = payload;
    })
    .addCase(actions.similarFilms, (state, {payload}) => {
      state.isLoading = false;
      state.similarFilms = payload;
    })
    .addCase(actions.comments, (state, {payload}) => {
      state.isLoading = false;
      state.comments = payload;
    });
});

export {reducer};
