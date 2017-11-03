import { combineReducers, Reducer } from 'redux';

import dataReducer from './data';
import editReducer from './edit';
import communicationReducer from './communication';

import { ReducersMap } from 'shared/helpers/redux';
import * as NS from '../../namespace';

const reducer: Reducer<NS.IReduxState> = combineReducers<NS.IReduxState>({
  data: dataReducer,
  edit: editReducer,
  communications: communicationReducer,
} as ReducersMap<NS.IReduxState>);

export default reducer;
