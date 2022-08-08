import {Video} from 'src/components';
import { useAppSelector } from 'src/hooks';

const Player = (): JSX.Element => {
  const {promoFilm} = useAppSelector((_) => _.all);

  return (
    <div className="player">
      <Video autoPlay src={promoFilm.videoLink} />
    </div>
  );
};

export default Player;
