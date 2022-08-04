import { createReducer, createAction } from '@reduxjs/toolkit';
import { Genres, Genre, GenreType } from 'src/types/genre';
import { FilmInfo } from 'src/types/films';
import { AuthorizationStatus} from '../const';

const FILM_COUNT_PER_STEP = 8;

export const actions = {
  changeGenre: createAction<GenreType>('film/changeGenre'),
  showMore: createAction('film/showMore'),
  requireAuthorization: createAction<AuthorizationStatus>('user/requireAuthorization'),
  loadFilms: createAction<FilmInfo[]>('data/loadFilms'),
  setError: createAction<string | null>('film/setError'),
  setDataLoadedStatus: createAction<boolean>('data/setDataLoadedStatus'),
  loadPromoFilm: createAction<FilmInfo>('data/loadPromoFilm'),
};

type InitalState = {
  genre: string,
  filmList: FilmInfo[],
  originalFilmList: FilmInfo[],
  promoFilm: FilmInfo,
  isEndOfTheList: boolean,
  currentStep: number,
  amountOfSteps: number,
  authorizationStatus: AuthorizationStatus,
  error: string | null,
  isDataLoaded: boolean,
};

const startState: InitalState = {
  genre: Genre.fromString(Genres.ALL_GENRES),
  filmList: [],
  originalFilmList: [],
  promoFilm: {} as FilmInfo,
  isEndOfTheList: false,
  currentStep: 1,
  amountOfSteps: 1,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(actions.changeGenre, (state, {payload: genre}) => {
      state.genre = genre;
      state.filmList = genre === Genre.fromString(Genres.ALL_GENRES)
        ? state.filmList
        : state.filmList.filter((element) => element.genre === Genre.toString(genre));

      state.currentStep = 1;
      state.amountOfSteps = Math.ceil(state.filmList.length / FILM_COUNT_PER_STEP);
      state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      state.originalFilmList = state.filmList.slice(0, FILM_COUNT_PER_STEP);
    })
    .addCase(actions.showMore, (state, ) => {
      if(state.currentStep + 1 <= state.amountOfSteps ) {
        state.currentStep += 1;
        state.originalFilmList = state.filmList.slice(0, state.currentStep * FILM_COUNT_PER_STEP);
        state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      }
    })
    .addCase(actions.loadFilms, (state, action) => {
      state.originalFilmList = action.payload;
      state.filmList = action.payload;
      state.originalFilmList = state.filmList.slice(0, FILM_COUNT_PER_STEP);
      state.amountOfSteps = Math.ceil(state.filmList.length / FILM_COUNT_PER_STEP);
    })
    .addCase(actions.requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(actions.setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(actions.setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(actions.loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    });
});

export {reducer};
