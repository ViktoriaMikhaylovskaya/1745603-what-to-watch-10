import { createReducer, createAction } from '@reduxjs/toolkit';
import { films } from 'src/mocks/films';
import { Genres, Genre, GenreType } from 'src/types/genre';

const FILM_COUNT_PER_STEP = 8;

export const changeGenre = createAction<GenreType>('film/changeGenre');
export const showMore = createAction('showMore');

const startState = {
  genre: Genre.fromString(Genres.ALL_GENRES),
  filmList: films,
  originalFilmList: films.slice(0, FILM_COUNT_PER_STEP),
  isEndOfTheList: false,
  currentStep: 1,
  amountOfSteps: Math.ceil(films.length / FILM_COUNT_PER_STEP),
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(changeGenre, (state, {payload: genre}) => {
      state.genre = genre;
      state.filmList = genre === Genre.fromString(Genres.ALL_GENRES)
        ? films
        : films.filter((element) => element.genre === Genre.toString(genre));

      state.currentStep = 1;
      state.amountOfSteps = Math.ceil(state.filmList.length / FILM_COUNT_PER_STEP);
      state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      state.originalFilmList = state.filmList.slice(0, FILM_COUNT_PER_STEP);
    })
    .addCase(showMore, (state, ) => {
      if(state.currentStep + 1 <= state.amountOfSteps ) {
        state.currentStep += 1;
        state.originalFilmList = state.filmList.slice(0, state.currentStep * FILM_COUNT_PER_STEP);
        state.isEndOfTheList = state.currentStep === state.amountOfSteps;
      }
    });
});

export {reducer};
