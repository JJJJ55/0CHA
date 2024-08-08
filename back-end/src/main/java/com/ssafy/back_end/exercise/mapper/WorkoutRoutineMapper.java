package com.ssafy.back_end.exercise.mapper;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineDetailDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface WorkoutRoutineMapper {
    int createRoutine(RoutineDto routineDto);
    int createRoutineDetail(RoutineDetailDto routineDetailDto);
    int createRoutineSet(RoutineSetDto routineSetDto);

    int updateRoutine(RoutineDto routineDto);

    int deleteRoutine(Map<String, Object> params);
    int deleteRoutineDetailsByRoutineId(int routineId);
    int deleteRoutineSetsByRoutineId(int routineId);

    RoutineDto getRoutineByIdAndUserId(Map<String, Object> params);
    List<RoutineDetailDto> getRoutineDetailsByRoutineId(int routineId);
    List<RoutineSetDto> getSetsByRoutineDetailId(int routineDetailId);
    String getExerciseNameById(int exerciseId);

    List<RoutineDto> getAllRoutines(int userId);
    List<RoutineDto> getAllUsersRoutines();

    int completeRoutine(Map<String, Object> params);

    int likeRoutine(@Param("routineId") int routineId, @Param("userId") int userId);
    int unlikeRoutine(@Param("routineId") int routineId, @Param("userId") int userId);
    boolean isRoutineLiked(@Param("routineId") int routineId, @Param("userId") int userId);
}
