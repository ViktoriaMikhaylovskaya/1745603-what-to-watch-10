import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App,ErrorMessage } from 'src/components';
import { store } from './store';
import {fetchFilmAction, checkAuthAction, fetchPromoFilmAction} from './store/api-actions';

store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
