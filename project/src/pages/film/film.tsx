import {Link, useNavigate} from 'react-router-dom';
import {FilmCard, Logo, Footer, UserBlock} from 'src/components';
import {FilmNavigation} from './film-nav';
import {FilmInfo} from 'src/types/films';
import {useAppDispatch, useAppSelector} from 'src/hooks';
import {AppRoute, AuthorizationStatus} from 'src/const';
import { addToFavoriteAction } from 'src/store/api-actions';


const Film = ({data}: {data: FilmInfo}): JSX.Element => {
  const {genre, name, posterImage, released, backgroundImage, id, isFavorite} = data;
  const {similarFilms} = useAppSelector((_) => _.film);
  const {authorizationStatus} = useAppSelector((_) => _.all);
  const {favoriteFilms} = useAppSelector((_) => _.favorite) as {favoriteFilms: FilmInfo[]};

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(`/player/${id}`);
  };

  const handleClickMyList = () => {
    if(authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
    }

    const status = +!isFavorite;
    dispatch(addToFavoriteAction({id, status}));
  };

  return (
    <section>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handleClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={handleClickMyList}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {
                      isFavorite
                        ? <use xlinkHref="#in-list"/>
                        : <use xlinkHref="#add"/>
                    }
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilms.length}</span>
                </button>
                <Link className="btn film-card__button"
                  to={authorizationStatus === AuthorizationStatus.Auth ? AppRoute.Review : AppRoute.SignIn}
                >Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <FilmNavigation data={data}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        {similarFilms.length >= 1
          ? (
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>
              <div className="catalog__films-list">
                {
                  similarFilms.slice(0, 4).map((film) => (
                    <FilmCard key={film.id} filmInfo={film} />
                  ))
                }
              </div>
            </section>
          )
          : ''}

        <Footer />
      </div>
    </section>
  );
};

export default Film;
