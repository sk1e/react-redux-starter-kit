interface ICommunicationReduxState {
  isRequesting: boolean;
  error: string;
}

export interface IReduxState {
  communication: {
    submiting: ICommunicationReduxState;
  };
}

export interface IFormDataError {
  title?: string;
  descr?: string;
  tags?: string[] | { _error: string };
  serviceZones?: IServiceZoneError[] | { _error: string };
}

export interface IServiceZoneError {
  name?: string;
  geoSet?: IGeoError[] | { _error: string };
  phones?: string[] | { _error: string };
  emails?: string[] | { _error: string };
  socials?: string[] | { _error: string };
}

export interface IGeoError {
  country?: string;
  city?: string;
  street?: string;
  build?: string;
}

export interface IFormData {
  title: string;
  descr: string;
  tags: string[];
  serviceZones: IServiceZone[];
}

export interface IServiceZone {
  name: string;
  geoSet: IGeo[];
  phones: string[];
  emails: string[];
  socials: string[];
}

export interface IGeo {
  country: string;
  city: string;
  street?: string;
  build?: string;
}
