import { useEffect, useRef } from 'react';

type Props = {
  videoLink: string;
}

const MiniPlayer = ({videoLink}: Props): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if(videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  return (
    <video src={videoLink} className="player__video" ref={videoRef} />
  );
};

export default MiniPlayer;
