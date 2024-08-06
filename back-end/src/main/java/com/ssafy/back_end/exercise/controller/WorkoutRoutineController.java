package com.ssafy.back_end.exercise.controller;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;
import com.ssafy.back_end.exercise.service.WorkoutRoutineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "루틴 설정 기능")
@RestController
@RequestMapping("/api/workout/routines")
public class WorkoutRoutineController {
    private final WorkoutRoutineService workoutRoutineService;

    @Autowired
    public WorkoutRoutineController(WorkoutRoutineService workoutRoutineService) {
        this.workoutRoutineService = workoutRoutineService;
    }

    @Operation(summary = "모든 루틴 목록 조회", description = "사용자의 모든 루틴 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getAllRoutines(@RequestHeader("ID") int userId) {
        List<RoutineDto> routines = workoutRoutineService.getAllRoutines(userId);
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        return ResponseEntity.ok(routines);
    }

    @Operation(summary = "특정 루틴의 상세 정보 조회", description = "루틴 ID를 사용하여 특정 루틴의 상세 정보를 조회합니다.")
    @GetMapping("/{routine_id}")
    public ResponseEntity<?> getRoutineById(@PathVariable("routine_id") int routineId) {
        RoutineDto routine = workoutRoutineService.getRoutineById(routineId);
        if (routine != null) {
            return ResponseEntity.ok(routine);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴을 찾을 수 없습니다");
        }
    }

    @Operation(summary = "새로운 루틴 생성", description = "새로운 루틴을 생성합니다.")
    @PostMapping
    public ResponseEntity<?> createRoutine(@RequestHeader("ID") int userId, @RequestBody RoutineDto routineDto) {
        // 현재 날짜와 시간을 가져옵니다.
        LocalDateTime now = LocalDateTime.now();

        // Timestamp를 LocalDateTime으로 변환
        Timestamp timestamp = routineDto.getDueDate();
        LocalDateTime dueDate = timestamp.toLocalDateTime();

        // dueDate가 현재 날짜와 시간보다 이전인지 확인합니다.
        if (dueDate.isBefore(now)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("루틴 마감일은 현재 날짜와 시간 이후로 설정해야 합니다.");
        }

        routineDto.setUserId(userId);
        int result = workoutRoutineService.createRoutine(routineDto);
        if (result != 0) {
            return ResponseEntity.ok("루틴 생성 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 생성 실패");
    }

    @Operation(summary = "기존 루틴 수정", description = "루틴 ID를 사용하여 기존 루틴을 수정합니다.")
    @PutMapping("/{routine_id}")
    public ResponseEntity<?> updateRoutine(@PathVariable("routine_id") int routineId, @RequestBody RoutineDto routineDto) {
        routineDto.setId(routineId);
        int result = workoutRoutineService.updateRoutine(routineDto);
        if (result != 0) {
            return ResponseEntity.ok("루틴 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 수정 실패");
    }

    @Operation(summary = "루틴 삭제", description = "루틴 ID를 사용하여 루틴을 삭제합니다.")
    @DeleteMapping("/{routine_id}")
    public ResponseEntity<?> deleteRoutine(@PathVariable("routine_id") int routineId) {
        int result = workoutRoutineService.deleteRoutine(routineId);
        if (result != 0) {
            return ResponseEntity.ok("루틴 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 삭제 실패");
    }

    @Operation(summary = "루틴에 운동 추가", description = "루틴 ID와 운동 ID를 사용하여 루틴에 운동을 추가합니다.")
    @PostMapping("/{routine_id}/exercise/{exercise_id}")
    public ResponseEntity<?> addExerciseToRoutine(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId) {
        int result = workoutRoutineService.addExerciseToRoutine(routineId, exerciseId);
        if (result != 0) {
            return ResponseEntity.ok("운동 추가 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("운동 추가 실패");
    }

    @Operation(summary = "루틴에서 운동 제거", description = "루틴 ID와 운동 ID를 사용하여 루틴에서 운동을 제거합니다.")
    @DeleteMapping("/{routine_id}/exercise/{exercise_id}")
    public ResponseEntity<?> removeExerciseFromRoutine(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId) {
        int result = workoutRoutineService.removeExerciseFromRoutine(routineId, exerciseId);
        if (result != 0) {
            return ResponseEntity.ok("운동 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("운동 삭제 실패");
    }

    @Operation(summary = "루틴의 특정 운동에 세트 추가", description = "루틴 ID와 운동 ID를 사용하여 루틴의 특정 운동에 세트를 추가합니다.")
    @PostMapping("/{routine_id}/exercises/{exercise_id}/sets")
    public ResponseEntity<?> addSetToExercise(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId, @RequestBody RoutineSetDto routineSetDto) {
        routineSetDto.setRoutineDetail(routineId);
        int result = workoutRoutineService.addSetToExercise(routineSetDto);
        if (result != 0) {
            return ResponseEntity.ok("세트 추가 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("세트 추가 실패");
    }

    @Operation(summary = "루틴의 특정 운동에서 세트 제거", description = "루틴 ID와 운동 ID를 사용하여 루틴의 특정 운동에서 세트를 제거합니다.")
    @DeleteMapping("/{routine_id}/exercises/{exercise_id}/sets/{set_id}")
    public ResponseEntity<?> removeSetFromExercise(@PathVariable("routine_id") int routineId, @PathVariable("exercise_id") int exerciseId, @PathVariable("set_id") int setId) {
        int result = workoutRoutineService.removeSetFromExercise(setId);
        if (result != 0) {
            return ResponseEntity.ok("세트 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("세트 삭제 실패");
    }

    @Operation(summary = "루틴 완료 처리", description = "루틴 ID를 사용하여 루틴을 완료 처리합니다.")
    @PutMapping("/{routine_id}/complete")
    public ResponseEntity<?> completeRoutine(@PathVariable("routine_id") int routineId) {
        int result = workoutRoutineService.completeRoutine(routineId);
        if (result != 0) {
            return ResponseEntity.ok("루틴 완료 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 완료 실패");
    }
}
