import { combineReducers, Reducer } from 'redux';

import initial from '../initial';

import { makeCommunicationReducer } from 'shared/helpers/redux';
import * as NS from '../../namespace';

function mainReducer(state: NS.IData = initial.data, action: NS.Action): NS.IData {
  switch (action.type) {
    case 'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS': {
      return { ...state, options: action.payload.categories as any };
    }
    case ('CATEGORY_SELECT:CATEGORY_SELECTED'): {
      return { ...state, selected: action.payload };
    }
    default:
      return state;
  }
}

const categoriesFetchingReducer =
  makeCommunicationReducer<NS.ILoadCategories, NS.ILoadCategoriesSuccess, NS.ILoadCategoriesFail>(
    'CATEGORY_SELECT:LOAD_CATEGORIES',
    'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS',
    'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
    initial.communications.categoriesFetching,
  );

const reducer: Reducer<NS.IReduxState> = combineReducers<NS.IReduxState>({
  data: mainReducer,
  communications: combineReducers({
    categoriesFetching: categoriesFetchingReducer,
  }),
});

export default reducer;
