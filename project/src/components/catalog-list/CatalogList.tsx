import {useAppSelector, useAppDispatch} from 'src/hooks';
import { FilmCard } from 'src/components';
import {changeGenre, showMore} from 'src/store/reducer';
import { Genre, genres } from 'src/types/genre';


const CatalogList = (): JSX.Element => {
  const state = useAppSelector((_) => _);
  const dispatch = useAppDispatch();

  return (
    <>
      <ul className="catalog__genres-list">
        {genres.map((key) => (
          <li key={key} className={`catalog__genres-item ${key === state.genre ? 'catalog__genres-item--active' : ''}`}>
            <button className="catalog__genres-link"
              onClick={() => {
                dispatch(changeGenre(key));
              }}
            >
              {Genre.toString(key)}
            </button>
          </li>))}
      </ul>

      <div className="catalog__films-list">
        {
          state.originalFilmList.map((film) => (
            <FilmCard key={film.id} filmInfo={film} />
          ))
        }
      </div>


      {!state.isEndOfTheList
        ? (
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={() => {dispatch(showMore());}}>Show more</button>
          </div>
        )
        : null}
    </>
  );
};

export default CatalogList;
