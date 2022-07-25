import { Link } from 'react-router-dom';
import { FilmInfo } from 'src/types/films';
import { useRef, useState } from 'react';
import { MiniPlayer } from 'src/components';

type Props= {
  filmInfo: FilmInfo;
};

const SECOND = 1000;

const FilmCard = ({filmInfo}: Props): JSX.Element => {
  const [isCardHover, setIsCardHover] = useState(false);
  const timer = useRef<any>();

  const onArticleHover = () => {
    timer.current = setTimeout(() => setIsCardHover(true), SECOND);
  };

  const onArticleLeave = () => {
    clearTimeout(timer.current);
    setIsCardHover(false);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onArticleHover} onMouseLeave={onArticleLeave} >
      <div className="small-film-card__image">
        {isCardHover ? <MiniPlayer src={filmInfo.player}/>
          : <img src={filmInfo.src} alt={filmInfo.title} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/films/:id">{filmInfo.title}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
