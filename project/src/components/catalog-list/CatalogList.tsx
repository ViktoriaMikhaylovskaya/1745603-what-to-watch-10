import {useAppSelector, useAppDispatch} from 'src/hooks';
import { FilmCard } from 'src/components';
import { FilmInfo } from 'src/types/films';
import {changeGenre} from 'src/store/reducer';
import { Genres, GenreType } from 'src/types/genre';

type Props = {
  films: FilmInfo[];
};

const CatalogList = ({films}: Props): JSX.Element => {
  const state = useAppSelector((_) => _);
  const dispatch = useAppDispatch();

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
          state.filmList.map((film) => (
            <FilmCard key={film.id} filmInfo={film} />
          ))
        }

      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </>
  );
};

export default CatalogList;
