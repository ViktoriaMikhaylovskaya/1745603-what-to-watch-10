import { FilmCard, Logo, Footer, UserBlock } from 'src/components';
import { useAppSelector } from 'src/hooks';
import { FilmInfo } from 'src/types/films';

const MyList = (): JSX.Element => {
  const {favoriteFilms} = useAppSelector((_) => _.favorite) as {favoriteFilms: FilmInfo[]};

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">

          {favoriteFilms.length === 0
            ? <div style={{display: 'flex',flexWrap: 'nowrap',width:'100%',justifyContent: 'center'}}>Список пуст.</div>
            : favoriteFilms.map((film) => (
              <FilmCard key={film.id} filmInfo={film} />
            ))}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyList;
