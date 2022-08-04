import { ChangeEvent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from 'src/components';
import { FilmInfo } from 'src/types/films';

type Props= {
  filmInfo: FilmInfo;
};

const stars = [1,2,3,4,5,6,7,8,9,10];

const Review = ({filmInfo}: Props): JSX.Element => {
  const [filmRating, setFilmRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmInfo.backgroundImage} alt={filmInfo.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/films/:id" className="breadcrumbs__link">{filmInfo.name}l</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to="/">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to="/">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmInfo.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {
                stars.map((element) => (
                  <Fragment key={element}>
                    <input onChange={() => setFilmRating(element)} className="rating__input" id={`star-${element}`} type="radio" name="rating" value={element} checked={filmRating === element} />
                    <label className="rating__label" htmlFor={`star-${element}`}>Rating {element}</label>
                  </Fragment>
                )
                )
              }
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleChange} value={comment}></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

export default Review;
