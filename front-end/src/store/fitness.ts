import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface FitnessState {
  type: string;
}

const initialState: FitnessState = {
  type : "all"
};

export const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    changeFitnessType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const fitnessActions = fitnessSlice.actions;
export const selectFitnessType = (state: RootState) => state.fitness.type;
export default fitnessSlice.reducer;
