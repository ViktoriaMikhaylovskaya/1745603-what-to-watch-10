import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchCommentction, fetchSelectedFilmAction, fetchSimilarFilmAction } from 'src/store/api-actions';
import { FilmInfo } from 'src/types/films';
import Film from './film';


const FilmContainer = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const state = useAppSelector((_) => _.film);

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchSelectedFilmAction(Number(id)));
      dispatch(fetchSimilarFilmAction(Number(id)));
      dispatch(fetchCommentction(Number(id)));
    }
  }, [id, dispatch]);

  if (state.isLoading) {
    return (
      <div>Loading</div>
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

  return <div></div>;

};

export default FilmContainer;
