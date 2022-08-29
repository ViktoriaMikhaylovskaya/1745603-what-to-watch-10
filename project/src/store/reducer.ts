import { createReducer, createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AppRoute } from 'src/const';

export const actions = {
  redirectToRoute: createAction<AppRoute>('film/redirectToRoute'),
  setDataLoadedStatus: createAction<boolean>('data/setDataLoadedStatus'),
  requireAuthorization: createAction<AuthorizationStatus>('user/requireAuthorization'),
};

export type initialState = {
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

const startState: initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(actions.requireAuthorization, (state, { payload }) => {
      state.authorizationStatus = payload;
    })
    .addCase(actions.setDataLoadedStatus, (state, { payload }) => {
      state.isDataLoaded = payload;
    });
});

export { reducer };
