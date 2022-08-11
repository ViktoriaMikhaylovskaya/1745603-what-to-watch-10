import {useAppSelector} from 'src/hooks';
import {humanizeDueDate} from 'src/const';

const Reviews = (): JSX.Element => {
  const {comments} = useAppSelector((_) => _.film);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {comments.length >= 1
          ? comments.map((element) => (
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
          : <p style={{color: 'black'}}>Комментариев пока нет.</p>}
      </div>
    </div>
  );
};

export default Reviews;
