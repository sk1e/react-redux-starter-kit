import { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ThunkAction, ActionCreator, Store } from 'redux';
import { Reducer } from 'redux';
import { SagaIterator } from 'redux-saga';
import Api from '../api/Api';

abstract class Module<S, C> {
  public components?: C; // available componens to pass in other modules

  protected _store: Store<IReduxState> | null = null;
  protected onConnectRequestHandler?: OnConnectRequestHandler;
  protected extraComponents?: { [key: string]: React.ReactElement<any> | null; };

  public set onConnectRequest(handler: OnConnectRequestHandler) {
    this.onConnectRequestHandler = handler;
  };

  public set store(store: Store<IReduxState>) {
    this._store = store;
  }

  public getRoutes?(): ReactElement<RouteComponentProps<any>> | Array<ReactElement<RouteComponentProps<any>>>;
  public getReducer?(): IReducerData<S>;
  public getSaga?(deps: IDependencies): () => SagaIterator;

  public setExtraComponent(key: keyof C, component: React.ReactElement<any>): void {
    if (this.extraComponents) {
      this.extraComponents[key] = component;
    } else {
      throw new Error('Cannot set module extra component: no requirements found for extra component');
    }
  };

  protected notifyAboutConnection(reducers: Array<IReducerData<any>>, sagas: RootSaga[]) {
    if (this.onConnectRequestHandler) {
      this.onConnectRequestHandler(reducers, sagas);
    }
  }
}

type OnConnectRequestHandler = (reducers: Array<IReducerData<any>>, sagas: RootSaga[]) => void;

interface IReducerData<S> {
  name: string;
  reducer: Reducer<S>;
}

interface IDependencies {
  api: Api;
}

interface IAction {
  payload?: { [key: string]: any } | number | string | null;
  type: string;
}

interface IReduxState {}

interface IModuleEntryData {
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  reducers: Array<IReducerData<any>>;
  sagas: RootSaga[];
}

type RootSaga = (deps: IDependencies) => () => SagaIterator;
type AsyncActionCreatorResult = ThunkAction<Promise<void>, IReduxState, IDependencies>;
type AsyncActionCreator = ActionCreator<AsyncActionCreatorResult>;

export { Module, IReducerData, IAction, IDependencies, IReduxState, IModuleEntryData };
export { RootSaga, AsyncActionCreator, AsyncActionCreatorResult };
