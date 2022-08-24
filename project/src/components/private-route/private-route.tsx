import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from 'src/const';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

const PrivateRoute = ({authorizationStatus, children}: Props): JSX.Element => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.SignIn} />
);

export default PrivateRoute;
