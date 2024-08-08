package com.ssafy.back_end.exercise.controller;

import com.ssafy.back_end.exercise.model.ExerciseDto;
import com.ssafy.back_end.exercise.service.WorkoutExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "운동 관련 기능")
@RestController
@RequestMapping("/api/workout/exercises")
public class WorkoutExerciseController {
    private final WorkoutExerciseService workoutExerciseService;

    @Autowired
    public WorkoutExerciseController(WorkoutExerciseService workoutExerciseService) {
        this.workoutExerciseService = workoutExerciseService;
    }

    @Operation(summary = "모든 운동 목록 조회", description = "모든 운동 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getAllExercises() {
        List<ExerciseDto> exercises = workoutExerciseService.getAllExercises();
        if (exercises.isEmpty()) {
            return ResponseEntity.ok("운동 목록이 비어 있습니다");
        }
        return ResponseEntity.ok(exercises);
    }

    @Operation(summary = "특정 운동의 상세 정보 조회", description = "특정 운동의 상세 정보를 조회합니다.")
    @GetMapping("/{exercise-id}")
    public ResponseEntity<?> getExerciseById(@PathVariable("exercise-id") int exerciseId) {
        ExerciseDto exercise = workoutExerciseService.getExerciseById(exerciseId);
        if (exercise != null) {
            return ResponseEntity.ok(exercise);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("운동을 찾을 수 없습니다");
        }
    }

    @Operation(summary = "운동 찜하기", description = "특정 운동을 찜합니다.")
    @PostMapping("/{exercise-id}/favorite")
    public ResponseEntity<?> favoriteExercise(HttpServletRequest request, @PathVariable("exercise-id") int exerciseId) {
        int userId = (Integer) request.getAttribute("userId");
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

    @Operation(summary = "운동 찜 취소하기", description = "특정 운동의 찜을 취소합니다.")
    @DeleteMapping("/{exercise-id}/favorite")
    public ResponseEntity<?> unfavoriteExercise(HttpServletRequest request, @PathVariable("exercise-id") int exerciseId) {
        int userId = (Integer) request.getAttribute("userId");
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

    @Operation(summary = "운동 찜 여부 확인", description = "특정 운동이 찜되었는지 여부를 확인합니다.")
    @GetMapping("/{exercise-id}/is-favorite")
    public ResponseEntity<?> isFavoriteExercise(HttpServletRequest request, @PathVariable("exercise-id") int exerciseId) {
        int userId = (Integer) request.getAttribute("userId");
        boolean isFavorite = workoutExerciseService.isFavoriteExercise(exerciseId, userId);
        return ResponseEntity.ok(new IsFavoriteResponse(exerciseId, isFavorite));
    }

    private static class IsFavoriteResponse {
        private final int exerciseId;
        private final boolean isFavorite;

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

    @Operation(summary = "사용자가 찜한 운동 목록 조회", description = "사용자가 찜한 운동 목록을 조회합니다.")
    @GetMapping("/favorites")
    public ResponseEntity<?> getFavoriteExercisesByUserId(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        List<ExerciseDto> favoriteExercises = workoutExerciseService.getFavoriteExercisesByUserId(userId);
        if (favoriteExercises.isEmpty()) {
            return ResponseEntity.ok("찜한 운동 목록이 비어 있습니다");
        }
        return ResponseEntity.ok(favoriteExercises);
    }

    @Operation(summary = "운동 이미지 URL 저장", description = "특정 운동의 이미지 URL을 저장합니다.")
    @PostMapping("/{exercise-id}/image")
    public ResponseEntity<?> saveExerciseImage(@PathVariable("exercise-id") int exerciseId, @RequestBody String imageUrl) {
        int result = workoutExerciseService.saveExerciseImage(exerciseId, imageUrl);
        if (result != 0) {
            return ResponseEntity.ok("이미지 URL 저장 성공");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 URL 저장 실패");
        }
    }
}
