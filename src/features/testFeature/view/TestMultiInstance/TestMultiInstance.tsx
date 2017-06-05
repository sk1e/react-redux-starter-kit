import * as React from 'react';
import { Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../redux';
import { IReduxState } from '../../namespace';
import initialState from '../../redux/data/initial';
import { multiConnect } from 'shared/redux/multiConnect';

interface IOwnProps {
  ownText: string;
}

interface IStateProps {
  counter: number;
}

interface IDispatchProps {
  incrementCounter: typeof actions.incrementCounter;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

function mapStateToProps(featureState: IReduxState): IStateProps {
  const counter = selectors.selectCounter(featureState);

  return { counter };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: IOwnProps): IDispatchProps {
  const props = bindActionCreators({
    incrementCounter: actions.incrementCounter,
  }, dispatch);
  return props;
}

class TestMultiInstance extends React.PureComponent<IProps, {}> {
  public render() {
    const { counter, incrementCounter, ownText } = this.props;
    return (
      <div>
        <p>
          <span>Counter: {counter}</span>
          {' / '}
          <span>Own text: {ownText}</span>
          {' / '}
          <button onClick={incrementCounter}>Increment</button>
        </p>
      </div>
    );
  }
}

export { IProps, TestMultiInstance };
export default multiConnect<IReduxState, IStateProps, IDispatchProps, IOwnProps>(
  ['testFeature'], initialState,  mapStateToProps, mapDispatchToProps)(TestMultiInstance);
