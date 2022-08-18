import { useAppSelector } from 'src/hooks';
import { InitalState } from './reducer';

export const useFilm = () => {
  const data: InitalState = useAppSelector((_) => _.film);
  return data;
};
