import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';
// import { AuthorizationStatus, AppRoute} from 'src/const';


export const actions = {
  fetch: createAction<FilmInfo['id']>('film/fetch'),
  fail: createAction<string>('film/fail'),
  success: createAction<FilmInfo>('film/success'),
  similarFilms: createAction<FilmInfo[]>('film/similarFilms'),
};

type InitalState = {
  data: FilmInfo | null,
  isLoading: boolean,
  error: string | null,
  similarFilms: FilmInfo[],
};

const initalState: InitalState = {
  data: null,
  isLoading: false,
  error: null,
  similarFilms: [],
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
    });
});

export {reducer};
