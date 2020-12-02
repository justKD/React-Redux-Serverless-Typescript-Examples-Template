import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
});

export type RootStateType = ReturnType<typeof reducer>;
export type AppDispatchType = typeof store.dispatch;
export type AppThunkType = ThunkAction<
  unknown,
  RootStateType,
  unknown,
  Action<string>
>;
