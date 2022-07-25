import { FilmCard, Logo, Footer } from 'src/components';
import {FilmInfo} from 'src/types/films';

type Props= {
  films: FilmInfo[];
};

const MyList = ({films}: Props): JSX.Element => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <Logo />

      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
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

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

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
);

export default MyList;
