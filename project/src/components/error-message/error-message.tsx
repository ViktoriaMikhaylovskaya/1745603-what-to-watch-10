import { useAppSelector } from 'src/hooks';
import './error-message.css';
import errorSelectors from 'src/store/error/selectors';

const ErrorMessage = (): JSX.Element | null => {
  const { error } = useAppSelector(errorSelectors);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

};

export default ErrorMessage;
