import {FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {Logo, Footer} from 'src/components';
import {useAppDispatch} from 'src/hooks';
import {loginAction} from 'src/store/api-actions';
import {AppRoute} from 'src/const';
import {AuthData} from 'src/types/user-data';
import {processErrorHandle} from 'src/services/process-error-handle';

const SignIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const target = evt.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData) as AuthData;

    if (data.login !== '' && data.password !== '') {
      dispatch(loginAction(data));
      navigate(AppRoute.Main);
    } else {
      processErrorHandle('Неверный логин или пароль, попробуйте заново.');
    }

  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="/" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="login"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
