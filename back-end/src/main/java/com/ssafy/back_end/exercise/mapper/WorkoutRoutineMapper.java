package com.ssafy.back_end.exercise.mapper;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WorkoutRoutineMapper {
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
