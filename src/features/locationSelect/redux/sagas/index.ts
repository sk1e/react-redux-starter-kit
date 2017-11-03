import { put, call, takeLatest } from 'redux-saga/effects';
import { normalizeCities } from '../data/schema';
import getErrorMsg from 'shared/helpers/getErrorMessage';
import { loadCitiesFail, loadCitiesSuccess } from '../actions/communication';

import { IDependencies } from 'shared/types/app';
import { INormalizedCitiesResponse } from 'shared/types/models';
import * as NS from '../../namespace';

const loadCitiesType: NS.ILoadCities['type'] = 'LOCATION_SELECT:LOAD_CITIES';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield takeLatest(loadCitiesType, executeLoadCities, deps);
  };
}

export function* executeLoadCities({ api }: IDependencies) {
  try {
    const response = yield call(api.loadCities);
    const data: INormalizedCitiesResponse = normalizeCities(response);
    yield put(loadCitiesSuccess(data));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(loadCitiesFail(message));
  }
}
