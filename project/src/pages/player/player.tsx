import {Video, NotFoundPage} from 'src/components';
import { useAppSelector } from 'src/hooks';
import { FilmInfo } from 'src/types/films';

const Player = (): JSX.Element => {
  const {data} = useAppSelector((_) => _.film);

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
