import { Fragment } from 'react';
import { useAppSelector } from 'src/hooks';

const Overview = (): JSX.Element => {
  const {promoFilm} = useAppSelector((_) => _);
  const {rating, scoresCount, description, director, starring} = promoFilm;
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}
        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring} and other</strong></p>
      </div>
    </Fragment>
  );
};

export default Overview;
