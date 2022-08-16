import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from 'src/services/api';
import {reducer as filmReducer} from 'src/store/film/reducer';
import {reducer as genreReducer} from 'src/store/genres/reducer';
import {reducer as favoriteReducer} from 'src/store/favoriteFilms/reducer';


export const api = createAPI();

export const store = configureStore({
  reducer: {
    all: reducer,
    film: filmReducer,
    genre: genreReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
