import { createReducer, createAction } from '@reduxjs/toolkit';
import { films } from 'src/mocks/films';
import { Genres, Genre, GenreType } from 'src/types/genre';

export const changeGenre = createAction<{genre: GenreType}>('film/changeGenre');

const startState = {
  genre: Genre.fromString(Genres.ALL_GENRES),
  filmList: films,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(changeGenre, (state, {payload: {genre}}) => {
      state.genre = genre;
      state.filmList = genre === Genre.fromString(Genres.ALL_GENRES)
        ? films
        : films.filter((element) => element.genre === Genre.toString(genre));
    });
});

export {reducer};
