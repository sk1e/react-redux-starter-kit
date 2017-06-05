import { IIncrementCounter } from './../../namespace';

export function incrementCounter(): IIncrementCounter {
  return { type: 'TEST_FEATURE:INCREMENT_COUNTER' };
}
