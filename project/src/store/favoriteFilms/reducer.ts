import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';

export const actions = {
  favorite: createAction<FilmInfo[]>('films/success'),
};

type InitalState = {
  favoriteFilms: FilmInfo[],
};

const initalState: InitalState = {
  favoriteFilms: [],
};

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(actions.favorite, (state, {payload}) => {
      state.favoriteFilms = payload;
    });
});

export {reducer};
