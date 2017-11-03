import { ICategoriesResponse } from 'services/api/Api';

export interface IReduxState {
  communications: {
    categoriesFetching: ICommunication;
  };
  data: IData;
}

export interface ICategory {
  uid: number;
  name: string;
  id: number;
}

export interface ICommunication {
  isRequesting: boolean;
  error: string;
}

export interface IData {
  options: ICategory[];
  selected: number | null;
}

export interface ICategorySelected {
  type: 'CATEGORY_SELECT:CATEGORY_SELECTED';
  payload: number;
}

export interface ILoadCategories {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES';
}

export interface ILoadCategoriesCompleted {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED';
  payload: ICategoriesResponse;
}

export interface ILoadCategoriesFailed {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED';
  payload: string;
}

export type Action = ICategorySelected | ILoadCategories | ILoadCategoriesCompleted | ILoadCategoriesFailed;
