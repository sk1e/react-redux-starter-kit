import { IReduxState, ICategory, ICommunication } from '../../namespace';
import { IAppReduxState } from 'shared/types/app';

function selectFeatureState(state: IAppReduxState): IReduxState {
  if (!state.categorySelect) {
    throw new Error('Cannot find categorySelect feature state!');
  }

  return state.categorySelect;
}

export function selectCategories(state: IAppReduxState): ICategory[] {
  return selectFeatureState(state).data.options;
}

export function selectChosenCategory(state: IAppReduxState): number | null {
  return selectFeatureState(state).data.selected;
}

export function selectCategoriesFetching(state: IAppReduxState): ICommunication {
  return selectFeatureState(state).communications.categoriesFetching;
}
