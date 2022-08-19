import { useAppSelector } from 'src/hooks';
import { InitalState } from './reducer';

export const useAuth = () => {
  const data: InitalState = useAppSelector((_) => _.auth);
  return data;
};
