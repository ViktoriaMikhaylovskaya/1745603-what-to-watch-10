import { createReducer, createAction } from '@reduxjs/toolkit';
import { Comment, AddComment } from 'src/types/comment';
import { FilmInfo } from 'src/types/films';

export const actions = {
  fetch: createAction<FilmInfo['id']>('film/fetch'),
  fail: createAction<string>('film/fail'),
  success: createAction<FilmInfo>('film/success'),
  markAsFavorite: createAction<boolean>('film/filmUpdate'),
  similarFilms: createAction<FilmInfo[]>('film/similarFilms'),

  fetchComments: createAction<FilmInfo['id']>('film/fetchComments'),
  fetchCommentsFail: createAction<string>('comment/fetchCommentsFail'),
  fetchCommentsSuccess: createAction<Comment[]>('comment/fetchCommentsSuccess'),

  addComment: createAction<AddComment>('film/addComment'),
  addCommentFail: createAction<string>('comment/addCommentFail'),
  addCommentSuccess: createAction<Comment[]>('comment/addCommentSuccess'),
};

export type InitalState = {
  data: FilmInfo | null,
  isLoading: boolean,
  error: string | null,
  similarFilms: FilmInfo[],
  addComment: { data: Comment | null, isLoading: boolean, error: string | null, isSuccess: boolean },
  comments: { data: Comment[], isLoading: boolean, error: string | null },
};

const initalState: InitalState = {
  data: null,
  isLoading: false,
  error: null,
  similarFilms: [],

  addComment: { data: null, isLoading: false, error: null, isSuccess: false },
  comments: { data: [], isLoading: false, error: null },
};

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(actions.fetch, (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(actions.fail, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    })
    .addCase(actions.success, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    })
    .addCase(actions.similarFilms, (state, { payload }) => {
      state.isLoading = false;
      state.similarFilms = payload;
    })
    .addCase(actions.fetchComments, (state, { payload }) => {
      state.comments.isLoading = true;
      state.comments.error = null;
    })
    .addCase(actions.fetchCommentsSuccess, (state, { payload }) => {
      state.comments.data = payload;
      state.comments.isLoading = false;
    })
    .addCase(actions.fetchCommentsFail, (state, { payload }) => {
      state.comments.error = payload;
      state.comments.isLoading = false;
    })
    .addCase(actions.addComment, (state, { payload }) => {
      state.addComment.isLoading = true;
      state.addComment.error = null;
      state.addComment.isSuccess = false;
    })
    .addCase(actions.addCommentSuccess, (state, { payload }) => {
      state.comments.data = payload;
      state.addComment.isLoading = false;
      state.addComment.isSuccess = true;
    })
    .addCase(actions.addCommentFail, (state, { payload }) => {
      state.addComment.error = payload;
      state.addComment.isLoading = false;
    })
    .addCase(actions.markAsFavorite, (state, { payload }) => {
      if (state.data !== null) {
        state.data.isFavorite = payload;
      }
    });
});

export { reducer };
