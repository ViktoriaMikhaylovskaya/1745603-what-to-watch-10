import { useAppSelector } from 'src/hooks';
import dayjs from 'dayjs';

const Reviews = (): JSX.Element => {
  const {comments} = useAppSelector((_) => _.film);

  const humanizeFilmDueDate = (date: string) => dayjs(date).format('MMMM D, YYYY');

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {comments.length >= 1
          ? comments.map((element) => {
            const {id, user, comment, date, rating} = element;
            return (
              <div className="review" key={id}>
                <blockquote className="review__quote">
                  <p className="review__text">{comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{user.name}</cite>
                    <time className="review__date" dateTime="2016-12-24">{humanizeFilmDueDate(date)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{rating}</div>
              </div>
            );
          })
          : <p style={{color: 'black'}}>Комментариев пока нет.</p>}
      </div>
    </div>
  );
};

export default Reviews;
