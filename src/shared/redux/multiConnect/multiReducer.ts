import { IMultiInstanceState, IMultiInstanceAction } from './namespace';

type Reducer<TReduxState> = (instanceState: TReduxState, action: IMultiInstanceAction) => TReduxState;

export function multiReducer<IReduxState>(reducer: Reducer<IReduxState>) {
  // tslint:disable-next-line:max-line-length
  return (state: IMultiInstanceState<IReduxState> = {}, action: IMultiInstanceAction): IMultiInstanceState<IReduxState> => {
    const { _instanceKey } = action;
    if (!_instanceKey) { return state; }

    const nextInstanceState = reducer(state[_instanceKey], action);
    return { ...state, [_instanceKey]: nextInstanceState };
  };
}
