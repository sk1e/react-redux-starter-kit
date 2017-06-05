export interface IReduxState {
  counter: number;
}

export interface IIncrementCounter { type: 'TEST_FEATURE:INCREMENT_COUNTER'; }

export type Action = IIncrementCounter;
