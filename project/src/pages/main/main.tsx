import { Link } from 'react-router-dom';
import { Logo, CatalogList, Footer } from 'src/components';
import {FilmInfo} from 'src/types/films';

type Props = {
  films: FilmInfo[];
  promoFilm: FilmInfo;
};

const Main = ({films, promoFilm}: Props): JSX.Element => {
  const {posterImage, name, genre, released} = promoFilm;
  return (
    <section>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to='/login'>Sign out</Link>
            </li>
          </ul>
        </header>

        {
          films ?
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
                    <button className="btn btn--play film-card__button" type="button">
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button className="btn btn--list film-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                      <span className="film-card__count">9</span>
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
