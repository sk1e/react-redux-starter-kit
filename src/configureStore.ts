import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Middleware,
  Store,
  ReducersMapObject,
  Action,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as locationSelectFeature from './features/locationSelect';
import * as dynamicFieldsFeature from './features/dynamicFields';
import * as testFeature from './features/testFeature';
import { Module, IReduxState, IDependencies, IReducerData } from './shared/types/app';
import { reducer as multiConnenctReducer, multiReducer } from './shared/redux/multiConnect';
import { SagaMiddleware } from 'redux-saga';

interface IStoreData {
  store: Store<IReduxState>;
  reducer: Reducer<IReduxState>;
  runSaga: SagaMiddleware['run'];
}

function configureStore(modules: Array<Module<any, any>>, deps: IDependencies): IStoreData {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [
    sagaMiddleware,
    thunk.withExtraArgument(deps),
  ];

  const reducer: Reducer<IReduxState> = createReducer(modules);
  const store: Store<IReduxState> = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension)
        ? window.devToolsExtension() : ((arg: any) => arg),
    ),
  ) as Store<IReduxState>;

  modules.forEach((module: Module<any, any>) => {
    if (module.getSaga) {
      sagaMiddleware.run(module.getSaga(deps));
    }
  });

  sagaMiddleware.run(locationSelectFeature.actions.saga(deps));
  sagaMiddleware.run(dynamicFieldsFeature.actions.saga(deps));

  return {
    store,
    reducer,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(
  modules: Array<Module<any, any>>, extraReducers?: Array<IReducerData<any>>,
): Reducer<IReduxState> {
  const reducersData = modules
    .filter((module: Module<any, any>) => module.getReducer)
    .map((module: Module<any, any>) => module.getReducer ? module.getReducer() : null)
    .concat(extraReducers || []);

  const modulesReducers: ReducersMapObject = reducersData.reduce(
    (reducers: ReducersMapObject, reducerData: IReducerData<any>) => {
      return { ...reducers, [reducerData.name]: reducerData.reducer };
    }, {} as ReducersMapObject,
  );

  const appReducer = combineReducers<IReduxState>({
    ...modulesReducers,
    testFeature: multiReducer(testFeature.reducer),
  });

  return composeReducers<IReduxState>([appReducer, multiConnenctReducer]);
}

function composeReducers<S>(reducers: Array<Reducer<any>>) {
  return <A extends Action>(state: S, action: A) =>
    reducers
      .reverse()
      .reduce((_state: S, reducer: Reducer<any>) => reducer(_state, action), state);
}

export { createReducer, IStoreData };
export default configureStore;
