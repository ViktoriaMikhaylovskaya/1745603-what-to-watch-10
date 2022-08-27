import { createReducer, createAction } from '@reduxjs/toolkit';
import { FilmInfo } from 'src/types/films';

export const actions = {
  loadPromoFilm: createAction<FilmInfo>('promo/load'),
  markAsFavorite: createAction<boolean>('promo/update'),
};

export type State = {
  promoFilm: FilmInfo,
};

const startState: State = {
  promoFilm: {} as FilmInfo,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(actions.loadPromoFilm, (state, { payload }) => {
      state.promoFilm = payload;
    })
    .addCase(actions.markAsFavorite, (state, { payload }) => {
      if (state.promoFilm !== null) {
        state.promoFilm.isFavorite = payload;
      }
    });
});

export { reducer };
