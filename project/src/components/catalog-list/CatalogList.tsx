import { useAppDispatch } from 'src/hooks';
import { FilmCard } from 'src/components';
import { actions } from 'src/store/genres/reducer';
import { Genre, genres } from 'src/types/genre';
import { useGenre } from 'src/store/genres/selectors';


const CatalogList = (): JSX.Element => {
  const state = useGenre();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(actions.showMore());
  };

  return (
    <>
      <ul className="catalog__genres-list">
        {genres.map((key) => (
          <li key={key} className={`catalog__genres-item ${key === state.genre ? 'catalog__genres-item--active' : ''}`}>
            <button className="catalog__genres-link"
              onClick={() => {
                dispatch(actions.changeGenre(key));
              }}
            >
              {Genre.toString(key)}
            </button>
          </li>))}
      </ul>

      <div className="catalog__films-list">
        {
          state.originalFilmList.map((film) => (<FilmCard key={film.id} filmInfo={film} />))
        }
      </div>


      {!state.isEndOfTheList && state.originalFilmList.length !== 0
        ? (
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={handleClick}>Show more</button>
          </div>
        )
        : null}
    </>
  );
};

export default CatalogList;
