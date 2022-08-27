import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks';
import { LoadingScreen } from 'src/pages';
import { Video, NotFoundPage } from 'src/components';
import { FilmInfo } from 'src/types/films';
import { useFilm } from 'src/store/film/selectors';
import { fetchSelectedFilmAction } from 'src/store/api-actions';

const Player = (): JSX.Element => {
  const state = useFilm();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchSelectedFilmAction(Number(id)));
    }
  }, [id, dispatch]);


  if (state.isLoading) {
    return (
      <LoadingScreen />
    );
  } else if (state.error) {
    return (
      <div>Error - {state.error}</div>
    );
  } else if (state.data !== null) {
    return (
      <div className="player">
        <Video data={state.data as FilmInfo} />
      </div>
    );
  }

  return <NotFoundPage />;
};

export default Player;
