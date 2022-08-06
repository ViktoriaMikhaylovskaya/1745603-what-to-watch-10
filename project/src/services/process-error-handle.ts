import {store} from 'src/store';
import {actions} from 'src/store/reducer';
import {clearErrorAction} from 'src/store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(actions.setError(message));
  store.dispatch(clearErrorAction());
};
