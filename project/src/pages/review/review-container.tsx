import { fetchSelectedFilmAction } from 'src/store/api-actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { NotFoundPage } from 'src/components';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { FilmInfo } from 'src/types/films';
import { LoadingScreen } from 'src/pages';
import { APIRoute } from 'src/const';
import { useEffect } from 'react';
import Review from './review';
import filmSelector from 'src/store/film/selectors';


const ReviewContainer = (): JSX.Element => {
  const state = useAppSelector(filmSelector);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(fetchSelectedFilmAction(Number(id)));
    }
  }, [id, dispatch]);

  if (state.addComment.isSuccess) {
    return <Navigate to={`${APIRoute.Films}/${id}`} />;

  } else if (state.isLoading) {
    return (
      <LoadingScreen />
    );

  } else if (state.data !== null) {
    return (
      <Review
        data={state.data as FilmInfo}
        isLoading={state.addComment.isLoading}
      />
    );
  }

  return <NotFoundPage />;

};

export default ReviewContainer;
