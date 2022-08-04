import {store} from '../store';
import {actions} from '../store/reducer';
import {clearErrorAction} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(actions.setError(message));
  store.dispatch(clearErrorAction());
};
