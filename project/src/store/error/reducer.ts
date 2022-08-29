import { createReducer, createAction } from '@reduxjs/toolkit';

export const actions = {
  setError: createAction<string | null>('film/setError'),
};

export type State = {
  error: string | null,
};

const initialState: State = {
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setError, (state, { payload }) => {
      state.error = payload;
    });
});

export { reducer };
