package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.mapper.WorkoutRoutineMapper;
import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutRoutineServiceImpl implements WorkoutRoutineService {
    private final WorkoutRoutineMapper workoutRoutineMapper;

    @Autowired
    public WorkoutRoutineServiceImpl(WorkoutRoutineMapper workoutRoutineMapper) {
        this.workoutRoutineMapper = workoutRoutineMapper;
    }

    @Override
    public List<RoutineDto> getAllRoutines(int userId) {
        return workoutRoutineMapper.getAllRoutines(userId);
    }

    @Override
    public RoutineDto getRoutineById(int routineId) {
        return workoutRoutineMapper.getRoutineById(routineId);
    }

    @Override
    public int createRoutine(RoutineDto routineDto) {
        return workoutRoutineMapper.createRoutine(routineDto);
    }

    @Override
    public int updateRoutine(RoutineDto routineDto) {
        return workoutRoutineMapper.updateRoutine(routineDto);
    }

    @Override
    public int deleteRoutine(int routineId) {
        return workoutRoutineMapper.deleteRoutine(routineId);
    }

    @Override
    public int addExerciseToRoutine(int routineId, int exerciseId) {
        return workoutRoutineMapper.addExerciseToRoutine(routineId, exerciseId);
    }

    @Override
    public int removeExerciseFromRoutine(int routineId, int exerciseId) {
        return workoutRoutineMapper.removeExerciseFromRoutine(routineId, exerciseId);
    }

    @Override
    public int addSetToExercise(RoutineSetDto routineSetDto) {
        return workoutRoutineMapper.addSetToExercise(routineSetDto);
    }

    @Override
    public int removeSetFromExercise(int setId) {
        return workoutRoutineMapper.removeSetFromExercise(setId);
    }

    @Override
    public int completeRoutine(int routineId) {
        return workoutRoutineMapper.completeRoutine(routineId);
    }
}
