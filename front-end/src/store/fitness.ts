import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import {
  axiosCreateRoutine,
  axiosCreateRoutineDetails,
  ExerciseDetailType,
  RoutineListDetail,
} from '../util/types/axios-fitness';

interface FitnessState {
  type: string;
  plan: axiosCreateRoutine;
  time: number;
  volume: number;
  rest: boolean;
  isSave: boolean;
}

const initialState: FitnessState = {
  type: 'all',
  plan: {
    title: '',
    sumVolume: 0,
    sumTime: 0,
    dueDate: '',
    details: [],
  },
  time: 0,
  volume: 0,
  rest: false,
  isSave: false,
};

export const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    changeFitnessType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setPlanData(state, action: PayloadAction<axiosCreateRoutine>) {
      state.plan = action.payload;
    },
    updateTitle(state, action: PayloadAction<string>) {
      state.plan.title = action.payload;
    },
    updateDueDate(state, action: PayloadAction<string>) {
      state.plan.dueDate = action.payload;
    },
    addExercise(state, action: PayloadAction<axiosCreateRoutineDetails>) {
      state.plan.details.push(action.payload);
    },
    removeExercise(state, action: PayloadAction<number>) {
      state.plan.details = state.plan.details.filter((_, index) => index !== action.payload);
    },
    updateExerciseSets(state, action: PayloadAction<{ index: number; sets: ExerciseDetailType[] }>) {
      const { index, sets } = action.payload;
      state.plan.details = state.plan.details.map((exercise, idx) =>
        idx === index ? { ...exercise, sets: [...sets] } : exercise,
      );
    },
    toggleRest(state, action: PayloadAction<boolean>) {
      state.rest = action.payload;
    },
    addVolume(state, action: PayloadAction<number>) {
      state.volume += action.payload;
    },
    disVolume(state, action: PayloadAction<number>) {
      state.volume -= action.payload;
    },
    saveTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    setFinish(state) {
      state.time = 0;
      state.volume = 0;
      state.isSave = false;
    },
    toggleSave(state, action: PayloadAction<boolean>) {
      state.isSave = action.payload;
    },
    // savePlanSet(state, action: PayloadAction<ExerciseDetailType[]>) {
    //   // 각 운동의 세트를 업데이트
    //   state.plan.details.forEach((exercise, idx) => {
    //     if (action.payload[idx]) {
    //       exercise.sets.push(action.payload[idx]);
    //     }
    //   });
    // },
  },
});

export const fitnessActions = fitnessSlice.actions;
export const selectFitnessType = (state: RootState) => state.fitness.type;
export const selectPlan = (state: RootState) => state.fitness.plan;
export const selectRest = (state: RootState) => state.fitness.rest;
export const selectTime = (state: RootState) => state.fitness.time;
export const selectVolume = (state: RootState) => state.fitness.volume;
export const selectSave = (state: RootState) => state.fitness.isSave;
export const { setPlanData, updateTitle, updateDueDate, addExercise, removeExercise, updateExerciseSets } =
  fitnessSlice.actions;
export default fitnessSlice.reducer;
