package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.model.RoutineDto;

import java.time.LocalDateTime;
import java.util.List;

public interface WorkoutRoutineService {
    List<RoutineDto> getAllUsersRoutines();

    List<RoutineDto> getAllRoutines(int userId);

    List<RoutineDto> getAllRoutinesLimit(int userId);

    RoutineDto getRoutineById(int routineId);

    RoutineDto getRoutine(int routineId);

    int upsertRoutine(RoutineDto routineDto);

    int deleteRoutine(int routineId, int userId);

    int completeRoutine(int routineId, int userId, LocalDateTime completedAt);

    boolean toggleLikeRoutine(int routineId, int userId);
}
