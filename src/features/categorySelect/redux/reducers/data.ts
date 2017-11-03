import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/helpers/redux';

type CategoriesState = NS.IReduxState['data']['categories'];

function loadCategoriesReducer(state: CategoriesState, action: NS.Action): CategoriesState {
  switch (action.type) {
    case 'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS': {
      return action.payload.categories as any;
    }
    default: return state;
  }
}

export default combineReducers({
  categories: loadCategoriesReducer,
} as ReducersMap<NS.IReduxState['data']>);
