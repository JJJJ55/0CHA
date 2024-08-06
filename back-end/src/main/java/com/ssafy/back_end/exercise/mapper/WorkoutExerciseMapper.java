package com.ssafy.back_end.exercise.mapper;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import com.ssafy.back_end.exercise.model.ExerciseLikeDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WorkoutExerciseMapper {
    List<ExerciseDto> getAllExercises();
    ExerciseDto getExerciseById(int id);
    ExerciseLikeDto isFavoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);
    int favoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);
    int unfavoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);
    List<ExerciseDto> getFavoriteExercisesByUserId(@Param("userId") int userId);
}
