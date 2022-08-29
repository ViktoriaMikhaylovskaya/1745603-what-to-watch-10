import { State } from 'src/types/state';

export const selector = (state: State) => state.error;

export default selector;
