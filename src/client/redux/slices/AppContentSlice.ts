import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  sigValue: number;
} = {
  sigValue: 1,
};

/**
 * Redux state and actions.
 */
export const AppContentSlice = createSlice({
  name: 'AppContentSlice',
  initialState: initialState,
  reducers: {
    setSigValue: (state, action: PayloadAction<number>) => {
      state.sigValue = action.payload;
    },
  },
});
