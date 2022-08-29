import { fetchSelectedFilmAction } from 'src/store/api-actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Video, NotFoundPage } from 'src/components';
import { useParams } from 'react-router-dom';
import { FilmInfo } from 'src/types/films';
import { LoadingScreen } from 'src/pages';
import { useEffect } from 'react';
import filmSelector from 'src/store/film/selectors';

const Player = (): JSX.Element => {
  const state = useAppSelector(filmSelector);
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
