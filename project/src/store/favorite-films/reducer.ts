import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';

export const actions = {
  favorite: createAction<FilmInfo[]>('films/success'),
};

export type State = {
  favoriteFilms: FilmInfo[],
};

const initialState: State = {
  favoriteFilms: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.favorite, (state, { payload }) => {
      state.favoriteFilms = payload;
    });
});

export { reducer };
