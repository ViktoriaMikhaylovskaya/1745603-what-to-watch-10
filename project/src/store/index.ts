import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from 'src/services/api';
import {reducer as filmReducer} from 'src/store/film/reducer';

export const api = createAPI();

export const store = configureStore({
  reducer: {all: reducer, film: filmReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
