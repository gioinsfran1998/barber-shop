import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootUser from './user';
// import rootAuth from "./auth";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    // auth: persistReducer({ key: "auth", storage }, rootAuth),
    user: persistReducer({ key: 'user', storage }, rootUser),
  });

  const store = createStore(
    persistReducer(
      {
        key: 'root',
        storage,
        whitelist: ['auth'],
      },
      reducer,
    ),

    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
    // console.log("restoredState", store.getState());
  });

  return { store, persistor };
}

export default configureStore;
