import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import userReducer from './features/user/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  user: userReducer,
});

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
