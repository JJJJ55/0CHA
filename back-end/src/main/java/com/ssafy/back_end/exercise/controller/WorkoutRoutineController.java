package com.ssafy.back_end.exercise.controller;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;
import com.ssafy.back_end.exercise.service.WorkoutRoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout/routines")
public class WorkoutRoutineController {
    private final WorkoutRoutineService workoutRoutineService;

    @Autowired
    public WorkoutRoutineController(WorkoutRoutineService workoutRoutineService) {
        this.workoutRoutineService = workoutRoutineService;
    }

    @GetMapping
    public ResponseEntity<?> getAllRoutines(@RequestHeader("ID") int userId) {
        List<RoutineDto> routines = workoutRoutineService.getAllRoutines(userId);
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        return ResponseEntity.ok(routines);
    }

    @GetMapping("/{routine_id}")
    public ResponseEntity<?> getRoutineById(@PathVariable("routine_id") int routineId) {
        RoutineDto routine = workoutRoutineService.getRoutineById(routineId);
        if (routine != null) {
            return ResponseEntity.ok(routine);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴을 찾을 수 없습니다");
        }
    }

    @PostMapping
    public ResponseEntity<?> createRoutine(@RequestHeader("ID") int userId, @RequestBody RoutineDto routineDto) {
        routineDto.setUserId(userId);
        int result = workoutRoutineService.createRoutine(routineDto);
        if (result != 0) {
            return ResponseEntity.ok("루틴 생성 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 생성 실패");
    }

    @PutMapping("/{routine_id}")
    public ResponseEntity<?> updateRoutine(@PathVariable("routine_id") int routineId, @RequestBody RoutineDto routineDto) {
        routineDto.setId(routineId);
        int result = workoutRoutineService.updateRoutine(routineDto);
        if (result != 0) {
            return ResponseEntity.ok("루틴 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 수정 실패");
    }

    @DeleteMapping("/{routine_id}")
    public ResponseEntity<?> deleteRoutine(@PathVariable("routine_id") int routineId) {
        int result = workoutRoutineService.deleteRoutine(routineId);
        if (result != 0) {
            return ResponseEntity.ok("루틴 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 삭제 실패");
    }

    @PostMapping("/{routine_id}/exercise/{exercise_id}")
    public ResponseEntity<?> addExerciseToRoutine(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId) {
        int result = workoutRoutineService.addExerciseToRoutine(routineId, exerciseId);
        if (result != 0) {
            return ResponseEntity.ok("운동 추가 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("운동 추가 실패");
    }

    @DeleteMapping("/{routine_id}/exercise/{exercise_id}")
    public ResponseEntity<?> removeExerciseFromRoutine(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId) {
        int result = workoutRoutineService.removeExerciseFromRoutine(routineId, exerciseId);
        if (result != 0) {
            return ResponseEntity.ok("운동 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("운동 삭제 실패");
    }

    @PostMapping("/{routine_id}/exercises/{exercise_id}/sets")
    public ResponseEntity<?> addSetToExercise(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId, @RequestBody RoutineSetDto routineSetDto) {
        routineSetDto.setRoutineDetail(routineId);
        int result = workoutRoutineService.addSetToExercise(routineSetDto);
        if (result != 0) {
            return ResponseEntity.ok("세트 추가 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("세트 추가 실패");
    }

    @DeleteMapping("/{routine_id}/exercises/{exercise_id}/sets/{set_id}")
    public ResponseEntity<?> removeSetFromExercise(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId, @PathVariable("set_id") int setId) {
        int result = workoutRoutineService.removeSetFromExercise(setId);
        if (result != 0) {
            return ResponseEntity.ok("세트 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("세트 삭제 실패");
    }

    @PutMapping("/{routine_id}/complete")
    public ResponseEntity<?> completeRoutine(@PathVariable("routine_id") int routineId) {
        int result = workoutRoutineService.completeRoutine(routineId);
        if (result != 0) {
            return ResponseEntity.ok("루틴 완료 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 완료 실패");
    }
}
