import { makeCommunicationActionCreators } from 'shared/helpers/redux';

import * as NS from './../../namespace';

// tslint:disable:max-line-length
export const { execute: loadCategories, completed: loadCategoriesSuccess, failed: loadCategoriesFail } =
  makeCommunicationActionCreators<NS.ILoadCategories, NS.ILoadCategoriesSuccess, NS.ILoadCategoriesFail>(
    'CATEGORY_SELECT:LOAD_CATEGORIES', 'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS', 'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
  );

export function chooseCategory(categoryUid: number): NS.ICategorySelected {
  return {
    type: 'CATEGORY_SELECT:CATEGORY_SELECTED',
    payload: categoryUid,
  };
}
