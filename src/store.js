import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from 'src/reducers';

const makeStore = (context) => {
  const middlewares = [];

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};

export const wrapper = createWrapper(makeStore);
