import { AppRoute, AuthorizationStatus } from 'src/const';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { logoutAction} from 'src/store/api-actions';

const UserBlock = (): JSX.Element => {
  const {authorizationStatus} = useAppSelector((_) => _.all);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutAction());
    }
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
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
