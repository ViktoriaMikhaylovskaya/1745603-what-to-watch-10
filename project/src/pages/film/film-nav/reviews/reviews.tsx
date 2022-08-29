import filmSelector from 'src/store/film/selectors';
import { humanizeDueDate } from 'src/utils';
import { useAppSelector } from 'src/hooks';

const Reviews = (): JSX.Element => {
  const { comments } = useAppSelector(filmSelector);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {comments.data.length >= 1
          ? comments.data.map((element) => (
            <div className="review" key={element.id}>
              <blockquote className="review__quote">
                <p className="review__text">{element.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{element.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{humanizeDueDate(element.date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{element.rating}</div>
            </div>
          ))
          : <p style={{ color: 'black' }}>Комментариев пока нет.</p>}
      </div>
    </div>
  );
};

export default Reviews;
