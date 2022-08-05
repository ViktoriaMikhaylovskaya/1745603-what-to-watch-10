import { Link } from 'react-router-dom';
import { FilmCard, Logo, Footer, FilmNavigation, UserBlock } from 'src/components';
import { useAppSelector } from 'src/hooks';

const Film = (): JSX.Element => {
  const state = useAppSelector((_) => _);
  const {genre, name, posterImage, released} = state.promoFilm;

  return (
    <section>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          {
            state.promoFilm ?
              <div className="film-card__wrap">
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
                    <Link to="/films/:id/review" className="btn film-card__button">Add review</Link>
                  </div>
                </div>
              </div> : null
          }
        </div>

        {
          state.promoFilm ?
            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
                </div>

                <FilmNavigation />
              </div>
            </div> : null
        }
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {
              state.originalFilmList.slice(0, 4).map((film) => (
                <FilmCard key={film.id} filmInfo={film} />
              ))
            }
          </div>
        </section>

        <Footer />
      </div>
    </section>
  );
};

export default Film;
