import { useEffect, useRef } from 'react';

type Props = {
  src: string;
}

const MiniPlayer = ({src}: Props): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if(videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  return (
    <video src={src} className="player__video" ref={videoRef} />
  );
};

export default MiniPlayer;
