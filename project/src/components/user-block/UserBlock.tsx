import { AppRoute } from 'src/const';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';

const UserBlock = (): JSX.Element => {
  const {authorizationStatus} = useAppSelector((_) => _);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to={authorizationStatus ? AppRoute.SignIn : AppRoute.Main}>
          {authorizationStatus ? 'Sign in' : 'Sign out'}
        </Link>
      </li>
    </ul>
  );
};

export default UserBlock;
