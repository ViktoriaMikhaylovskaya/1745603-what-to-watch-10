import { useState, useEffect, useRef, Fragment, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { formattingLastTime } from 'src/utils';
import { FilmInfo } from 'src/types/films';
import { Spinner } from 'src/components';
import { useBoolean } from 'src/hooks';
import './video.css';

enum ProgressPlay {
  Start = 0,
  End = 100,
}

const Video = ({ data }: { data: FilmInfo }): JSX.Element => {
  const [isLoading, { setFalse: loadingIsComplete }] = useBoolean();
  const [isPlaying, { set: setIsPlaying, toggle: handleClickButton }] = useBoolean();

  const [progress, setProgress] = useState<number>(ProgressPlay.Start);
  const [lastTime, setLastTime] = useState<number>(ProgressPlay.Start);

  const formatLastTime = formattingLastTime(lastTime);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;

    if (element === null) {
      return;
    }

    element.addEventListener('loadeddata', loadingIsComplete);

    if (isPlaying) {
      element.play();
      return;
    } else {
      element.pause();
    }

    return () => {
      element.removeEventListener('loadeddata', loadingIsComplete);
    };
  }, [isPlaying, loadingIsComplete]);

  const navigate = useNavigate();

  const handleClickExit = () => {
    navigate(-1);
    setIsPlaying(false);

  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current?.currentTime / videoRef.current?.duration) * ProgressPlay.End;
      setProgress(currentProgress);
      setLastTime(videoRef.current.duration - videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const initVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = ProgressPlay.Start;
      togglePlay();
    }
  };

  const handleEndPlay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = ProgressPlay.Start;
      setIsPlaying(false);
    }
  };

  const handleVideoProgress = (evt: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(evt.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current?.duration / ProgressPlay.End) * manualChange;
      setProgress(manualChange);
    }
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  return (
    <Fragment>
      <video
        src={data?.videoLink}
        className="player__video"
        poster={data?.name}
        ref={videoRef}
        onLoadedMetadata={initVideo}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEndPlay}
      >
      </video>

      <button type="button" className="player__exit" onClick={handleClickExit}>Exit</button>

      {isLoading ? <Spinner /> : ''}

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <input
              className="player__progress"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleVideoProgress}
            />
            <progress className="player__progress" value={progress} max="100"></progress>
          </div>
          <div className="player__time-value">- {formatLastTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" disabled={isLoading} onClick={handleClickButton}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{data.name}</div>

          <button type="button" className="player__full-screen" onClick={toggleFullscreen}>
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
