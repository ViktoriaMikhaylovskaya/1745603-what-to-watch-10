import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';
// import { AuthorizationStatus, AppRoute} from 'src/const';


export const actions = {
  fetch: createAction<FilmInfo['id']>('film/fetch'),
  fail: createAction<string>('film/fail'),
  success: createAction<FilmInfo>('film/success'),
};

type InitalState = {
  data: FilmInfo | null,
  isLoading: boolean,
  error: string | null,
};

const initalState: InitalState = {
  data: null,
  isLoading: false,
  error: null,
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
    });
});

export {reducer};
