import { createReducer, createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AppRoute} from 'src/const';

export const actions = {
  redirectToRoute: createAction<AppRoute>('film/redirectToRoute'),
  setDataLoadedStatus: createAction<boolean>('data/setDataLoadedStatus'),
  requireAuthorization: createAction<AuthorizationStatus>('user/requireAuthorization'),
};

export type InitalState = {
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

const initalState: InitalState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(actions.requireAuthorization, (state, {payload}) => {
      state.authorizationStatus = payload;
    })
    .addCase(actions.setDataLoadedStatus, (state, {payload}) => {
      state.isDataLoaded = payload;
    });
});

export {reducer};
