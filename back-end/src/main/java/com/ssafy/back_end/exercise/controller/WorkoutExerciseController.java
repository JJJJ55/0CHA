package com.ssafy.back_end.exercise.controller;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import com.ssafy.back_end.exercise.service.WorkoutExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout/exercise")
public class WorkoutExerciseController {
    private final WorkoutExerciseService workoutExerciseService;

    @Autowired
    public WorkoutExerciseController(WorkoutExerciseService workoutExerciseService) {
        this.workoutExerciseService = workoutExerciseService;
    }

    // 모든 운동목록
    @GetMapping("/")
    public ResponseEntity<?> getAllExercises() {
        List<ExerciseDto> exercises = workoutExerciseService.getAllExercises();
        if (exercises.isEmpty()) {
            return ResponseEntity.ok("운동 목록이 비어 있습니다");
        }
        return ResponseEntity.ok(exercises);
    }

    // 특정 운동의 상세 정보
    @GetMapping("/{exercise_id}")
    public ResponseEntity<?> getExerciseById(@PathVariable("exercise_id") int exerciseId) {
        ExerciseDto exercise = workoutExerciseService.getExerciseById(exerciseId);
        if (exercise != null) {
            return ResponseEntity.ok(exercise);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("운동을 찾을 수 없습니다");
        }
    }

    // 운동 찜하기
    @PostMapping("/{exercise_id}/favorite")
    public ResponseEntity<?> favoriteExercise(@PathVariable("exercise_id") int exerciseId, @RequestHeader("ID") int userId) {
        boolean isFavorite = workoutExerciseService.isFavoriteExercise(exerciseId, userId);
        if (!isFavorite) {
            int result = workoutExerciseService.favoriteExercise(exerciseId, userId);
            if (result != 0) {
                return ResponseEntity.ok("좋아요 성공");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("좋아요 실패");
            }
        } else {
            return ResponseEntity.ok("이미 좋아요 되어 있습니다");
        }
    }

    // 운동 찜 취소하기
    @DeleteMapping("/{exercise_id}/favorite")
    public ResponseEntity<?> unfavoriteExercise(@PathVariable("exercise_id") int exerciseId, @RequestHeader("ID") int userId) {
        boolean isFavorite = workoutExerciseService.isFavoriteExercise(exerciseId, userId);
        if (isFavorite) {
            int result = workoutExerciseService.unfavoriteExercise(exerciseId, userId);
            if (result != 0) {
                return ResponseEntity.ok("좋아요 취소 성공");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("좋아요 취소 실패");
            }
        } else {
            return ResponseEntity.ok("좋아요 되어 있지 않습니다");
        }
    }

    // 운동 찜 여부 확인
    @GetMapping("/{exercise_id}/is_favorite")
    public ResponseEntity<?> isFavoriteExercise(@PathVariable("exercise_id") int exerciseId, @RequestHeader("ID") int userId) {
        boolean isFavorite = workoutExerciseService.isFavoriteExercise(exerciseId, userId);
        return ResponseEntity.ok(new IsFavoriteResponse(exerciseId, isFavorite));
    }

    private static class IsFavoriteResponse {
        private int exerciseId;
        private boolean isFavorite;

        public IsFavoriteResponse(int exerciseId, boolean isFavorite) {
            this.exerciseId = exerciseId;
            this.isFavorite = isFavorite;
        }

        public int getExerciseId() {
            return exerciseId;
        }

        public boolean isFavorite() {
            return isFavorite;
        }
    }
}
