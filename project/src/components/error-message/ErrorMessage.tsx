import {useAppSelector} from 'src/hooks';
import './error-message.css';

const ErrorMessage = (): JSX.Element | null => {
  const {error} = useAppSelector((state) => state.all);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

};

export default ErrorMessage;
