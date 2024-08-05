package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;

import java.util.List;

public interface WorkoutRoutineService {
    List<RoutineDto> getAllRoutines(int userId);
    RoutineDto getRoutineById(int routineId);
    int createRoutine(RoutineDto routineDto);
    int updateRoutine(RoutineDto routineDto);
    int deleteRoutine(int routineId);
    int addExerciseToRoutine(int routineId, int exerciseId);
    int removeExerciseFromRoutine(int routineId, int exerciseId);
    int addSetToExercise(RoutineSetDto routineSetDto);
    int removeSetFromExercise(int setId);
    int completeRoutine(int routineId);
}
