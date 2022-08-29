import { createReducer, createAction } from '@reduxjs/toolkit';
import { Genres, Genre, GenreType } from 'src/types/genre';
import { FilmInfo } from 'src/types/films';

const FILM_COUNT_PER_STEP = 8;

export const actions = {
  changeGenre: createAction<GenreType>('film/changeGenre'),
  showMore: createAction('film/showMore'),
  loadFilms: createAction<FilmInfo[]>('data/loadFilms'),
};

export type initialState = {
  genre: string,
  rawFilms: FilmInfo[],
  films: FilmInfo[],
  filteredFilms: FilmInfo[],
  isEndOfTheList: boolean,
  currentStep: number,
  amountOfSteps: number,
};

const startState: initialState = {
  genre: Genre.fromString(Genres.ALL_GENRES),
  rawFilms: [],
  films: [],
  filteredFilms: [],
  isEndOfTheList: false,
  currentStep: 1,
  amountOfSteps: 1,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(actions.changeGenre, (state, { payload: genre }) => {
      state.genre = genre;
      state.filteredFilms = genre === Genre.fromString(Genres.ALL_GENRES)
        ? state.rawFilms
        : state.rawFilms.filter((element) => element.genre === Genre.toString(genre));

      state.currentStep = 1;
      state.amountOfSteps = Math.ceil(state.filteredFilms.length / FILM_COUNT_PER_STEP);
      state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      state.films = state.filteredFilms.slice(0, FILM_COUNT_PER_STEP);
    })
    .addCase(actions.showMore, (state) => {
      if (state.currentStep + 1 <= state.amountOfSteps) {
        state.currentStep += 1;
        state.films = state.filteredFilms.slice(0, state.currentStep * FILM_COUNT_PER_STEP);
        state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      }
    })
    .addCase(actions.loadFilms, (state, { payload }) => {
      state.rawFilms = payload;
      state.filteredFilms = payload;
      state.amountOfSteps = Math.ceil(state.filteredFilms.length / FILM_COUNT_PER_STEP);
      state.films = state.rawFilms.slice(0, FILM_COUNT_PER_STEP);
    });
});

export { reducer };
