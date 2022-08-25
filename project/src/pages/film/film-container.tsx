import { fetchCommentction, fetchSelectedFilmAction, fetchSimilarFilmAction } from 'src/store/api-actions';
import { useFilm } from 'src/store/film/selectors';
import { NotFoundPage } from 'src/components';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks';
import { FilmInfo } from 'src/types/films';
import { LoadingScreen } from 'src/pages';
import { useEffect } from 'react';
import Film from './film';


const FilmContainer = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const state = useFilm();

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchSelectedFilmAction(Number(id)));
      dispatch(fetchSimilarFilmAction(Number(id)));
      dispatch(fetchCommentction(Number(id)));
    }
  }, [id, dispatch]);

  if (state.isLoading) {
    return (
      <LoadingScreen />
    );
  } else if(state.error) {
    return (
      <div>Error - {state.error}</div>
    );
  } else if(state.data !== null) {
    return (
      <Film
        data={state.data as FilmInfo}
      />
    );
  }

  return <NotFoundPage />;

};

export default FilmContainer;
