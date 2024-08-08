package com.ssafy.back_end.exercise.mapper;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WorkoutExerciseMapper {
    List<ExerciseDto> getAllExercises();

    ExerciseDto getExerciseById(@Param("exerciseId") int exerciseId);

    int favoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    int unfavoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    boolean isFavoriteExercise(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    List<ExerciseDto> getFavoriteExercisesByUserId(@Param("userId") int userId);

    int saveExerciseImage(@Param("exerciseId") int exerciseId, @Param("imageUrl") String imageUrl); // 이미지 URL 저장 메서드 추가
}
