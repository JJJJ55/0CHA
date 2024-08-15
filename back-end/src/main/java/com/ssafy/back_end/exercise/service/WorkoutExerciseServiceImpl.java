package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import com.ssafy.back_end.exercise.mapper.WorkoutExerciseMapper;
import com.ssafy.back_end.exercise.model.ExerciseRecordDto;
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
    public List<ExerciseDto> getAllExercises(int userId) {
        List<ExerciseDto> exercises = workoutExerciseMapper.getAllExercises();
        exercises.forEach(exercise -> {
            boolean isLike = workoutExerciseMapper.isExerciseLiked(exercise.getId(), userId);
            exercise.setLike(isLike);
        });
        return exercises;
    }

    @Override
    public ExerciseDto getExerciseById(int exerciseId, int userId) {
        ExerciseDto exercise = workoutExerciseMapper.getExerciseById(exerciseId);
        if (exercise != null) {
            boolean isLike = workoutExerciseMapper.isExerciseLiked(exerciseId, userId);
            exercise.setLike(isLike);
        }
        return exercise;
    }

    @Override
    public int favoriteExercise(int exerciseId, int userId) {
        return workoutExerciseMapper.favoriteExercise(exerciseId, userId);
    }

    @Override
    public int unfavoriteExercise(int exerciseId, int userId) {
        return workoutExerciseMapper.unfavoriteExercise(exerciseId, userId);
    }

    @Override
    public boolean isFavoriteExercise(int exerciseId, int userId) {
        return workoutExerciseMapper.isFavoriteExercise(exerciseId, userId);
    }

    @Override
    public List<ExerciseDto> getFavoriteExercisesByUserId(int userId) {
        List<ExerciseDto> favoriteExercises = workoutExerciseMapper.getFavoriteExercisesByUserId(userId);
        favoriteExercises.forEach(exercise -> exercise.setLike(true));
        return favoriteExercises;
    }


    @Override
    public int saveExerciseImage(int exerciseId, String imageUrl) {
        return workoutExerciseMapper.saveExerciseImage(exerciseId, imageUrl);
    }

    @Override
    public List<ExerciseRecordDto> getRecentExerciseRecords(int exerciseId, int userId) {
        return workoutExerciseMapper.getRecentExerciseRecords(exerciseId, userId);
    }
}
