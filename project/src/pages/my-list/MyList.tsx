import { FilmCard, Logo, Footer, UserBlock } from 'src/components';
import { useAppSelector } from 'src/hooks';

const MyList = (): JSX.Element => {
  const {originalFilmList} = useAppSelector((_) => _.all);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            originalFilmList.map((film) => (
              <FilmCard key={film.id} filmInfo={film} />
            ))
          }
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyList;
