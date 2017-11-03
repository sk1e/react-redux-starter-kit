import { IReduxState, IData } from '../namespace';
import { initialCommunicationField } from 'shared/helpers/redux';

const initialDataState: IData = {
  options: [],
  selected: null,
};

/* Construct main feature state from defined parts */
const initialState: IReduxState = {
  communications: {
    categoriesFetching: { ...initialCommunicationField },
  },
  data: { ...initialDataState },
};

export { initialDataState };
export default initialState;
