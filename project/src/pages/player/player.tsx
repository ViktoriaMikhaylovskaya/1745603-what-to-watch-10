import {Video} from 'src/components';

type Props= {
  src: string;
};

const Player = ({src}: Props): JSX.Element => (
  <div className="player">
    <Video autoPlay src={src} />
  </div>
);

export default Player;
