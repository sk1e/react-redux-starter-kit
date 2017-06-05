import { IReduxState } from '../../namespace';
import { IReduxState as IAppReduxState } from 'shared/types/app';

export function selectCounter(state: IReduxState): number {
  return state.counter;
}

export function selectFeatureState(appState: IAppReduxState): IReduxState {
  return appState.testFeature;
}
