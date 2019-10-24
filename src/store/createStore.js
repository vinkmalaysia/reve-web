import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

function initMiddlewares ({ isServer }) {
  const middlewares = [];

  return middlewares;
}

export default (preloadedState = {}, context) => {
  const { isServer } = context;
  const middlewares = initMiddlewares({ isServer });

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};
