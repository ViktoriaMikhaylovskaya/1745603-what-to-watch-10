import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useAppSelector} from 'src/hooks';
import {AppRoute, isCheckedAuth} from 'src/const';
import {Film, Main, MyList, SignIn, Player, Review, LoadingScreen} from 'src/pages';
import {NotFoundPage, PrivateRoute} from 'src/components';

const App = (): JSX.Element => {
  const {authorizationStatus, isDataLoaded, promoFilm, originalFilmList} = useAppSelector((_) => _);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main />}/>
        <Route path={AppRoute.Film} element={<Film filmInfo={promoFilm} />}/>
        <Route path={AppRoute.SignIn} element={<SignIn />}/>
        <Route path={AppRoute.Review} element={<Review filmInfo={promoFilm} />}/>
        <Route path={AppRoute.Player} element={<Player src={promoFilm.videoLink} />}/>

        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList films={originalFilmList} />
          </PrivateRoute>
        }
        />

        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
