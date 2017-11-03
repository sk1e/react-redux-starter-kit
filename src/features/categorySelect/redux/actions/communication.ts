import * as NS from './../../namespace';
import { ICategoriesResponse } from 'services/api/Api';

export function loadCategories(): NS.ILoadCategories {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' };
}

export function loadCategoriesCompleted(categoriesResponse: ICategoriesResponse): NS.ILoadCategoriesCompleted {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: categoriesResponse };
}

export function loadCategoriesFailed(message: string): NS.ILoadCategoriesFailed {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: message };
}

export function chooseCategory(categoryUid: number): NS.ICategorySelected {
  return {
    type: 'CATEGORY_SELECT:CATEGORY_SELECTED',
    payload: categoryUid,
  };
}
