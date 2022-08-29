import { Link, useNavigate } from 'react-router-dom';
import { MiniPlayer } from 'src/components';
import { FilmInfo } from 'src/types/films';
import { useRef, useState } from 'react';
import { APIRoute } from 'src/const';

type Props = {
  filmInfo: FilmInfo;
};

const SECOND = 1000;

const FilmCard = ({ filmInfo }: Props): JSX.Element => {
  const [isCardHover, setIsCardHover] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();

  const onArticleHover = () => {
    timer.current = setTimeout(() => setIsCardHover(true), SECOND);
  };

  const onArticleLeave = () => {
    clearTimeout(timer.current);
    setIsCardHover(false);
  };

  const handleClickFilm = () => {
    navigate(`${APIRoute.Films}/${filmInfo.id}`);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onArticleHover} onMouseLeave={onArticleLeave} onClick={handleClickFilm}>
      <div className="small-film-card__image">
        {isCardHover ? <MiniPlayer videoLink={filmInfo.previewVideoLink} />
          : <img src={filmInfo.previewImage} alt={filmInfo.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmInfo.id}`}>{filmInfo.name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
