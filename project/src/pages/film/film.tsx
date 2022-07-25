import { Link } from 'react-router-dom';
import { FilmCard, Logo, Footer } from 'src/components';
import { FilmInfo } from 'src/types/films';
import { films } from 'src/mocks/films';

type Props= {
  filmInfo: FilmInfo;
};

const Film = ({filmInfo}: Props): JSX.Element => {
  const {genre, title, rating, src, ratingCount, text, release, director, actors} = filmInfo;

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

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link" href="/">Sign out</a>
              </li>
            </ul>
          </header>

          {
            filmInfo ?
              <div className="film-card__wrap">
                <div className="film-card__desc">
                  <h2 className="film-card__title">{title}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{genre}</span>
                    <span className="film-card__year">{release}</span>
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
          filmInfo ?
            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img src={src} alt="The Grand Budapest Hotel poster" width="218" height="327" />
                </div>

                <div className="film-card__desc">
                  <nav className="film-nav film-card__nav">
                    <ul className="film-nav__list">
                      <li className="film-nav__item film-nav__item--active">
                        <a href="/" className="film-nav__link">Overview</a>
                      </li>
                      <li className="film-nav__item">
                        <a href="/" className="film-nav__link">Details</a>
                      </li>
                      <li className="film-nav__item">
                        <a href="/" className="film-nav__link">Reviews</a>
                      </li>
                    </ul>
                  </nav>

                  <div className="film-rating">
                    <div className="film-rating__score">{rating}</div>
                    <p className="film-rating__meta">
                      <span className="film-rating__level">Very good</span>
                      <span className="film-rating__count">{ratingCount} ratings</span>
                    </p>
                  </div>

                  <div className="film-card__text">
                    {text}
                    <p className="film-card__director"><strong>Director: {director}</strong></p>

                    <p className="film-card__starring"><strong>Starring: {actors} and other</strong></p>
                  </div>
                </div>
              </div>
            </div> : null
        }
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {
              films.map((film) => (
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
