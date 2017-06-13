import * as React from 'react';
import { bind } from 'decko';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IReduxState as IAppReduxState } from 'shared/types/app';

import { addInstance, removeInstance } from './actions';
import { MapStateToProps, MapDispatchToProps, ReactComponent, IMultiInstanceAction } from './namespace';

let instanceKeyCounter: number = 1;

const multiConnect = <TReduxState, TStateProps, TDispatchProps, TOwnProps>(
  keyPathToState: string[],
  initialState: TReduxState,
  mapStateToProps: MapStateToProps<TReduxState, TStateProps, TOwnProps>,
  mapDispatchToProps?: MapDispatchToProps<TDispatchProps, TOwnProps>,
) => {
  return (WrappedComponent: ReactComponent<TStateProps & TDispatchProps & TOwnProps>): ReactComponent<TOwnProps> => {

    class MultiConnector extends React.PureComponent<TOwnProps, {}> {
      public static contextTypes = {
        store: React.PropTypes.object,
      };
      public context: { store: Store<IAppReduxState> };

      private ConnectedComponent: ReactComponent<TOwnProps>;
      private instanceKey: number;

      public componentWillMount() {
        this.instanceKey = instanceKeyCounter++;

        this.context.store.dispatch(addInstance(this.instanceKey, initialState, keyPathToState));
        this.ConnectedComponent = connect(
          this.mapStateToProps,
          mapDispatchToProps ? this.mapDispatchToProps : null as any,
        )(WrappedComponent);
      }

      public componentWillUnmount() {
        this.context.store.dispatch(removeInstance(this.instanceKey, keyPathToState));
      }

      public render() {
        const { ConnectedComponent, props } = this;
        return <ConnectedComponent {...props as any} />;
      }

      @bind
      private mapStateToProps(appState: any, ownProps?: TOwnProps): TStateProps {
        const state = keyPathToState.reduce((prev, cur) => prev ? prev[cur] : prev, appState);
        const instanceState = state ? state[this.instanceKey] : {};
        return mapStateToProps(instanceState, ownProps);
      }

      @bind
      private mapDispatchToProps(dispatch: Dispatch<any>, ownProps?: TOwnProps): TDispatchProps {
        if (!mapDispatchToProps) { return ({} as TDispatchProps); }

        const actions = mapDispatchToProps(this.actionDecorator as any, ownProps);
        return bindActionCreators(actions as any, dispatch);
      }

      @bind
      private actionDecorator(action: IMultiInstanceAction): IMultiInstanceAction {
        action._instanceKey = this.instanceKey;
        return action;
      }
    }

    return MultiConnector;
  };
};

export { multiConnect }
