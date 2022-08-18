import {useAppDispatch} from 'src/hooks';
import {useNavigate} from 'react-router-dom';
import {Logo, CatalogList, Footer, UserBlock} from 'src/components';
import {AppRoute, AuthorizationStatus} from 'src/const';
import {addToFavoriteAction} from 'src/store/api-actions';
import { useFavorite } from 'src/store/favoriteFilms/selectors';
import { usePromo } from 'src/store/promo/selectors';
import { useAuth } from 'src/store/selectors';

const Main = (): JSX.Element => {
  const { promoFilm } = usePromo();
  const { favoriteFilms } = useFavorite();
  const { authorizationStatus } = useAuth();
  const {backgroundImage, posterImage, name, genre, released, id, isFavorite} = promoFilm;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickPlay = () => {
    navigate(`player/${id}`);
  };

  const handleClickMyList = () => {
    if(authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
    }

    dispatch(addToFavoriteAction({id, status: !isFavorite}));
  };

  return (
    <section>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>

        {
          promoFilm ?
            <div className="film-card__wrap">
              <div className="film-card__info">
                <div className="film-card__poster">
                  <img src={posterImage} alt={name} width="218" height="327" />
                </div>

                <div className="film-card__desc">
                  <h2 className="film-card__title">{name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{genre}</span>
                    <span className="film-card__year">{released}</span>
                  </p>

                  <div className="film-card__buttons">
                    <button className="btn btn--play film-card__button" type="button" onClick={handleClickPlay}>
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
                  </div>
                </div>
              </div>
            </div> : null
        }
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <CatalogList />

        </section>

        <Footer />
      </div>
    </section>
  );
};

export default Main;
