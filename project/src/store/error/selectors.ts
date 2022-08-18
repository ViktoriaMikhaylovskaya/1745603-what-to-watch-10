import { useAppSelector } from 'src/hooks';
import { State } from './reducer';

export const useError = () => {
  const data: State = useAppSelector((_) => _.error);
  return data;
};
