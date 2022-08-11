import { createReducer, createAction } from '@reduxjs/toolkit';
import { Genres, Genre, GenreType } from 'src/types/genre';
import { FilmInfo } from 'src/types/films';
// import { AuthorizationStatus, AppRoute} from 'src/const';

const FILM_COUNT_PER_STEP = 8;

export const actions = {
  changeGenre: createAction<GenreType>('film/changeGenre'),
  showMore: createAction('film/showMore'),
  loadFilms: createAction<FilmInfo[]>('data/loadFilms'),
};

type InitalState = {
  genre: string,
  filmList: FilmInfo[],
  originalFilmList: FilmInfo[],
  isEndOfTheList: boolean,
  currentStep: number,
  amountOfSteps: number,
};

const startState: InitalState = {
  genre: Genre.fromString(Genres.ALL_GENRES),
  filmList: [],
  originalFilmList: [],
  isEndOfTheList: false,
  currentStep: 1,
  amountOfSteps: 1,
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
    .addCase(actions.showMore, (state) => {
      if(state.currentStep + 1 <= state.amountOfSteps ) {
        state.currentStep += 1;
        state.originalFilmList = state.filmList.slice(0, state.currentStep * FILM_COUNT_PER_STEP);
        state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      }
    })
    .addCase(actions.loadFilms, (state, {payload}) => {
      state.originalFilmList = payload;
      state.filmList = payload;
      state.originalFilmList = state.filmList.slice(0, FILM_COUNT_PER_STEP);
      state.amountOfSteps = Math.ceil(state.filmList.length / FILM_COUNT_PER_STEP);
    });
});

export {reducer};
