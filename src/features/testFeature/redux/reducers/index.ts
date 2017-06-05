import initialState from '../data/initial';
import { IReduxState, Action } from '../../namespace';

function mainReducer(state: IReduxState = initialState, action: Action): IReduxState {
  switch (action.type) {
  case 'TEST_FEATURE:INCREMENT_COUNTER':
    return { ...state, counter: state.counter + 1 };
  default:
    return state;
  }
}

export default mainReducer;
