import { useAppSelector } from 'src/hooks';
import { InitalState } from './reducer';

export const useGenre = () => {
  const data: InitalState = useAppSelector((_) => _.genre);
  return data;
};
