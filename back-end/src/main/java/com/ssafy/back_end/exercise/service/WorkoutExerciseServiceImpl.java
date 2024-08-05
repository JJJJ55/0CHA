package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.mapper.WorkoutExerciseMapper;
import com.ssafy.back_end.exercise.model.ExerciseDto;
import com.ssafy.back_end.exercise.model.ExerciseLikeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {
    private final WorkoutExerciseMapper workoutExerciseMapper;

    @Autowired
    public WorkoutExerciseServiceImpl(WorkoutExerciseMapper workoutExerciseMapper) {
        this.workoutExerciseMapper = workoutExerciseMapper;
    }

    @Override
    public List<ExerciseDto> getAllExercises() {
        return workoutExerciseMapper.getAllExercises();
    }

    @Override
    public ExerciseDto getExerciseById(int exerciseId) {
        return workoutExerciseMapper.getExerciseById(exerciseId);
    }

    @Override
    public boolean isFavoriteExercise(int exerciseId, int userId) {
        return workoutExerciseMapper.isFavoriteExercise(exerciseId, userId) != null;
    }

    @Override
    public int favoriteExercise(int exerciseId, int userId) {
        return workoutExerciseMapper.favoriteExercise(exerciseId, userId);
    }

    @Override
    public int unfavoriteExercise(int exerciseId, int userId) {
        return workoutExerciseMapper.unfavoriteExercise(exerciseId, userId);
    }
}