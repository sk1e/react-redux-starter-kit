import * as comActions from './communication';
import saga from './sagas';

const actions = {
  ...comActions,
  saga,
};

export default actions;
