import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface PageState {
  snsType: string;
  isSign: boolean;
  isEmail: boolean;
  isPw: boolean;
  isPlay: boolean;
  isFinish: boolean;
  isScan: boolean;
}

const initialState: PageState = {
  snsType: 'feed',
  isSign: false,
  isEmail: false,
  isPw: false,
  isPlay: false,
  isFinish: false,
  isScan: false,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    changeSnsType: (state, action: PayloadAction<string>) => {
      state.snsType = action.payload;
    },
    OnPageChange: (state) => {
      state.isSign = true;
    },
    OffPageChange: (state) => {
      state.isSign = false;
    },
    toogleIsEmail: (state, action: PayloadAction<boolean>) => {
      state.isEmail = action.payload;
    },
    toogleIsPw: (state, action: PayloadAction<boolean>) => {
      state.isPw = action.payload;
    },
    toogleIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toogleIsFinish: (state, action: PayloadAction<boolean>) => {
      state.isFinish = action.payload;
    },
    toogleIsScan: (state, action: PayloadAction<boolean>) => {
      state.isScan = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
export const selectSnsType = (state: RootState) => state.page.snsType;
export const selectIsSign = (state: RootState) => state.page.isSign;
export const selectIsEmail = (state: RootState) => state.page.isEmail;
export const selectIsPw = (state: RootState) => state.page.isPw;
export const selectIsPlay = (state: RootState) => state.page.isPlay;
export const selectIsFinish = (state: RootState) => state.page.isFinish;
export const selectIsScan = (state: RootState) => state.page.isScan;
export default pageSlice.reducer;
