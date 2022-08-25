import { Fragment } from 'react';
import { FilmInfo } from 'src/types/films';
import { getRatingDescription } from 'src/utils';

const Overview = ({data}: {data: FilmInfo}): JSX.Element => {
  const {rating, scoresCount, description, director, starring} = data;

  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}
        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </Fragment>
  );
};

export default Overview;
