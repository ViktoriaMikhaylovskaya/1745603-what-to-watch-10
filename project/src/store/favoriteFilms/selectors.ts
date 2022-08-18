import { useAppSelector } from 'src/hooks';
import { State } from './reducer';

export const useFavorite = () => {
  const data: State = useAppSelector((_) => _.favorite);
  return data;
};
