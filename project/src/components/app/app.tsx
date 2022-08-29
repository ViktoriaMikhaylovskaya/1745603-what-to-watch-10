import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, isCheckedAuth } from 'src/const';
import { Film, Main, MyList, SignIn, Player, Review, LoadingScreen } from 'src/pages';
import { NotFoundPage, PrivateRoute } from 'src/components';
import { useAppSelector } from 'src/hooks';
import authSelector from 'src/store/selectors';

const App = (): JSX.Element => {
  const { authorizationStatus, isDataLoaded } = useAppSelector(authSelector);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={AppRoute.Film} element={<Film />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.Player} element={<Player />} />

        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList />
          </PrivateRoute>
        }
        />

        <Route path={`${AppRoute.Film}/${AppRoute.Review}`} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Review />
          </PrivateRoute>
        }
        />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
