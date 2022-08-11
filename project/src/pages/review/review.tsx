import {ChangeEvent, Fragment, useState, FormEvent} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {Logo, UserBlock} from 'src/components';
import {useAppDispatch} from 'src/hooks';
import {APIRoute} from 'src/const';
import {FilmInfo} from 'src/types/films';
import {addCommentction} from 'src/store/api-actions';
import {processErrorHandle} from 'src/services/process-error-handle';


const STARS = [10,9,8,7,6,5,4,3,2,1];

const Review = ({data}: {data: FilmInfo | null}): JSX.Element => {
  const {backgroundImage, name, posterImage, id} = data || {};

  const [filmRating, setFilmRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (comment === '' && filmRating === 0) {
      processErrorHandle('Пожалуйста, поставьте оценку и введите комментарий.');
    } else {
      dispatch(addCommentction({rating: filmRating, comment, filmId: id}));
      navigate(`${APIRoute.Films}/${id}`);
    }

  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${APIRoute.Films}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={APIRoute.Review}>Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action={`${APIRoute.Films}/${id}`} className="add-review__form" onSubmit={handleSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {
                STARS.map((element) => (
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
            <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text" onChange={handleChange} value={comment}></textarea>
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
