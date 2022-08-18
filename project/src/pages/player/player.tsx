import {Video, NotFoundPage} from 'src/components';
import { useFilm } from 'src/store/film/selectors';
import { FilmInfo } from 'src/types/films';

const Player = (): JSX.Element => {
  const {data} = useFilm();

  if(data !== null) {
    return (
      <div className="player">
        <Video data={data as FilmInfo} />
      </div>
    );
  }

  return <NotFoundPage />;
};

export default Player;
