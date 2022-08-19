import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from 'src/services/api';
import {reducer} from './reducer';
import {reducer as filmReducer} from 'src/store/film/reducer';
import {reducer as genreReducer} from 'src/store/genres/reducer';
import {reducer as favoriteReducer} from 'src/store/favoriteFilms/reducer';
import {reducer as PromoReducer} from 'src/store/promo/reducer';
import {reducer as ErrorReducer} from 'src/store/error/reducer';


export const api = createAPI();

export const store = configureStore({
  reducer: {
    auth: reducer,
    film: filmReducer,
    genre: genreReducer,
    favorite: favoriteReducer,
    promo: PromoReducer,
    error: ErrorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
