import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ModalState {
  isCalendar: boolean;
  isUserSearch: boolean;
  isComment: boolean;
  isMarket: boolean;
}

const initialState: ModalState = {
  isCalendar: false,
  isUserSearch: false,
  isComment: false,
  isMarket: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleCalendar: (state) => {
      state.isCalendar = !state.isCalendar;
    },
    toggleUserSearch: (state) => {
      state.isUserSearch = !state.isUserSearch;
    },
    toggleComment: (state) => {
      state.isComment = !state.isComment;
    },
    toggleMarket: (state) => {
      state.isMarket = !state.isMarket;
    },
    CloseCalendar: (state) => {
      state.isCalendar = false;
    },
    CloseUserSearch: (state) => {
      state.isUserSearch = false;
    },
    CloseComment: (state) => {
      state.isComment = false;
    },
    CloseMarket: (state) => {
      state.isMarket = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export const selectModalCalendar = (state: RootState) => state.modal.isCalendar;
export const selectModalUserSearch = (state: RootState) => state.modal.isUserSearch;
export const selectModalComment = (state: RootState) => state.modal.isComment;
export const selectModalMarket = (state: RootState) => state.modal.isMarket;

export default modalSlice.reducer;
