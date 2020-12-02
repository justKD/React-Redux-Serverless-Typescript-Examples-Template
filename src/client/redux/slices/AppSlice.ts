import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  greeting: string;
  deployed: string | boolean;
} = {
  greeting: '',
  deployed: '',
};

/**
 * Redux state and actions.
 */
export const AppSlice = createSlice({
  name: 'AppSlice',
  initialState: initialState,
  reducers: {
    setGreeting: (state, action: PayloadAction<string>) => {
      state.greeting = action.payload;
    },
    setDeployed: (state, action: PayloadAction<string | boolean>) => {
      state.deployed = action.payload;
    },
  },
});
