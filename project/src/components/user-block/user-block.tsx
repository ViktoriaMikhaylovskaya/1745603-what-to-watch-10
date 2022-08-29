import { useAppDispatch, useAppSelector } from 'src/hooks';
import { AppRoute, AuthorizationStatus } from 'src/const';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from 'src/store/api-actions';
import authSelector from 'src/store/selectors';

const UserBlock = (): JSX.Element => {
  const { authorizationStatus } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutAction());
    }
  };

  const handleClickAvatar = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
    }
    navigate(AppRoute.MyList);
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" onClick={handleClickAvatar}>
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to={AppRoute.SignIn} onClick={handleSubmit}>
          {authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}
        </Link>
      </li>
    </ul>
  );
};

export default UserBlock;
