import { ICategoriesResponse } from 'services/api/Api';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: IData;
  communications: {
    categoriesFetching: ICommunicationState;
  };
}

export interface IData {
  options: ICategory[];
  selected: number | null;
}

export interface ICategory {
  uid: number;
  name: string;
  id: number;
}

export interface ICategorySelected {
  type: 'CATEGORY_SELECT:CATEGORY_SELECTED';
  payload: number;
}

export interface ILoadCategories {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES';
}

export interface ILoadCategoriesSuccess {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS';
  payload: ICategoriesResponse;
}

export interface ILoadCategoriesFail {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL';
  error: string;
}

export type Action = ICategorySelected | ILoadCategories | ILoadCategoriesSuccess | ILoadCategoriesFail;
