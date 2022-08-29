import { fetchCommentAction, fetchSelectedFilmAction, fetchSimilarFilmAction } from 'src/store/api-actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { NotFoundPage } from 'src/components';
import { useParams } from 'react-router-dom';
import { FilmInfo } from 'src/types/films';
import { LoadingScreen } from 'src/pages';
import { useEffect } from 'react';
import Film from './film';
import filmSelector from 'src/store/film/selectors';


const FilmContainer = (): JSX.Element => {
  const { id } = useParams();
  const state = useAppSelector(filmSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchSelectedFilmAction(Number(id)));
      dispatch(fetchSimilarFilmAction(Number(id)));
      dispatch(fetchCommentAction(Number(id)));
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
      <Film
        data={state.data as FilmInfo}
      />
    );
  }

  return <NotFoundPage />;

};

export default FilmContainer;
