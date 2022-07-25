import { useState, useEffect, useRef, Fragment} from 'react';

type Props= {
  autoPlay: boolean;
  src: string;
};

const Video = ({src,autoPlay}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const clickButton = () => setIsPlaying(!isPlaying);
  const loadingData = () => setIsLoading(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (element === null) {
      return;
    }


    element.addEventListener('loadeddata', loadingData);

    if (isPlaying) {
      element.play();
      return;
    } else {
      element.pause();
    }

    return () => {
      element.removeEventListener('loadeddata', loadingData);
    };
  }, [isPlaying]);

  return (
    <Fragment>
      <video src={src} className="player__video" poster="img/player-poster.jpg" ref={videoRef}></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" disabled={isLoading} onClick={clickButton}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Video;
