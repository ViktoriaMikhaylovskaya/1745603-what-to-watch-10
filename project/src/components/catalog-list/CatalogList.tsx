import {useAppSelector, useAppDispatch} from 'src/hooks';
import { useState } from 'react';
import { FilmCard } from 'src/components';
import {changeGenre} from 'src/store/reducer';
import { Genres, GenreType } from 'src/types/genre';

const FILM_COUNT_PER_STEP = 8;

const CatalogList = (): JSX.Element => {
  const state = useAppSelector((_) => _);
  const dispatch = useAppDispatch();
  let initialCountOfFilms = 8;

  const [button, setButton] = useState(false);
  const countOfFilms = button ? state.filmList.length : FILM_COUNT_PER_STEP;

  const handleShowMoreButtonClick = () => {
    const restFilmsCount = Math.min(state.filmList.length, initialCountOfFilms + FILM_COUNT_PER_STEP);
    const films = state.filmList.slice(initialCountOfFilms, restFilmsCount);

    initialCountOfFilms = restFilmsCount;

    if (initialCountOfFilms >= films.length) {
      setButton(true);
    }
  };

  return (
    <>
      <ul className="catalog__genres-list">
        {Object.entries(Genres).map(([key, value]) => (
          <li key={key} className={`catalog__genres-item ${key === state.genre ? 'catalog__genres-item--active' : ''}`}>
            <button className="catalog__genres-link"
              onClick={() => {
                dispatch(changeGenre({genre: key as GenreType}));
              }}
            >
              {value}
            </button>
          </li>))}
      </ul>

      <div className="catalog__films-list">

        {
          state.filmList.slice(0, countOfFilms).map((film) => (
            <FilmCard key={film.id} filmInfo={film} />
          ))
        }

      </div>

      <div className="catalog__more">
        {state.filmList.length > FILM_COUNT_PER_STEP && !button
          ? <button className="catalog__button" type="button" onClick={handleShowMoreButtonClick}>Show more</button> : ''}
      </div>
    </>
  );
};

export default CatalogList;
