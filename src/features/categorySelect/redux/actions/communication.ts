import * as NS from './../../namespace';

export function loadCategories(): NS.ILoadCategories {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' };
}

export function chooseCategory(categoryUid: number): NS.ICategorySelected {
  return {
    type: 'CATEGORY_SELECT:CATEGORY_SELECTED',
    payload: categoryUid,
  };
}
