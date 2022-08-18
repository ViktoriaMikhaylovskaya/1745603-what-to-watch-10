import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';

export const actions = {
  loadPromoFilm: createAction<FilmInfo>('data/loadPromoFilm'),
};

export type State = {
  promoFilm: FilmInfo,
};

const startState: State = {
  promoFilm: {} as FilmInfo,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(actions.loadPromoFilm, (state, {payload}) => {
      state.promoFilm = payload;
    });
});

export {reducer};
