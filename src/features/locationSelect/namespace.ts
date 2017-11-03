import {
  IAreaEntities, ICityEntities, SelectedLocation, ICommunication,
  INormalizedCitiesResponse,
} from 'shared/types/models';

interface IReduxState {
  communications: {
    citiesFetching: ICommunication;
  };
  data: {
    entities: {
      areas: IAreaEntities;
      cities: ICityEntities;
    },
    citiesSet: number[],
    selectedLocation: SelectedLocation;
  };
  ui: {
    showSelectedLocation: boolean;
  };
}

export interface ILoadCities {
  type: 'LOCATION_SELECT:LOAD_CITIES';
}

export interface ILoadCitiesSuccess {
  type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS';
  payload: INormalizedCitiesResponse;
}

export interface ILoadCitiesFail {
  type: 'LOCATION_SELECT:LOAD_CITIES_FAIL';
  error: string;
}

export {
  ICommunication,
  IReduxState,
  IAreaEntities,
  ICityEntities,
  SelectedLocation,
};
