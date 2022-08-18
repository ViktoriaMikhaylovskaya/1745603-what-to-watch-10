import { useAppSelector } from 'src/hooks';
import { State } from './reducer';

export const usePromo = () => {
  const data: State = useAppSelector((_) => _.promo);
  return data;
};
