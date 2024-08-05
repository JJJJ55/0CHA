import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface PageState {
  snsType: string;
}

const initialState: PageState = {
  snsType: 'feed',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    changeSnsType: (state, action: PayloadAction<string>) => {
      state.snsType = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
export const selectSnsType = (state: RootState) => state.page.snsType;
export default pageSlice.reducer;
