import { IFeatureEntry, BundleLoader } from 'shared/types/app';

import * as namespace from './namespace';

import { reducer, actions as acts, selectors as sels, getSaga } from './redux';
import * as conts from './view/containers';

const actions = { ...acts };
const selectors = { ...sels };
const containers = { ...conts };

const entry: IFeatureEntry<typeof containers, typeof actions, typeof selectors> = {
  actions,
  selectors,
  containers,
  reducers: { categorySelect: reducer },
  sagas: [getSaga],
};

type Entry = typeof entry;

export { Entry, namespace };
export default entry as any as BundleLoader<Entry>;
