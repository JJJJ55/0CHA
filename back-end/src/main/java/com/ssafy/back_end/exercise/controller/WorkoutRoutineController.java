package com.ssafy.back_end.exercise.controller;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSummaryDto;
import com.ssafy.back_end.exercise.service.WorkoutRoutineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "루틴 설정 기능")
@RestController
@RequestMapping("/api/workout/routines")
public class WorkoutRoutineController {
    private final WorkoutRoutineService workoutRoutineService;

    @Autowired
    public WorkoutRoutineController(WorkoutRoutineService workoutRoutineService) {
        this.workoutRoutineService = workoutRoutineService;
    }

    @Operation(summary = "모든 사용자의 루틴 목록 조회", description = "모든 사용자의 루틴 목록을 조회합니다.")
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsersRoutines() {
        List<RoutineDto> routines = workoutRoutineService.getAllUsersRoutines();
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        List<RoutineSummaryDto> summaryRoutines = routines.stream()
                .map(r -> new RoutineSummaryDto(r.getId(), r.getTitle(), r.getDueDate(), r.isLike()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaryRoutines);
    }

    @Operation(summary = "본인의 루틴 목록 조회", description = "사용자의 모든 루틴 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getAllRoutines(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");

        List<RoutineDto> routines = workoutRoutineService.getAllRoutines(userId);
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        List<RoutineSummaryDto> summaryRoutines = routines.stream()
                .map(r -> new RoutineSummaryDto(r.getId(), r.getTitle(), r.getDueDate(), r.isLike()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaryRoutines);
    }

    @Operation(summary = "특정 루틴의 상세 정보 조회", description = "루틴 ID를 사용하여 특정 루틴의 상세 정보를 조회합니다.")
    @GetMapping("/{routine-id}")
    public ResponseEntity<?> getRoutineById(HttpServletRequest request, @PathVariable("routine-id") int routineId) {
        int userId = (Integer) request.getAttribute("userId");

        RoutineDto routine = workoutRoutineService.getRoutineById(routineId, userId);
        if (routine != null) {
            return ResponseEntity.ok(routine);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴을 찾을 수 없습니다");
        }
    }

    @Operation(summary = "루틴 생성 및 업데이트", description = "루틴을 생성하거나 업데이트합니다.")
    @PutMapping({"/{routine-id}", ""})
    public ResponseEntity<?> upsertRoutine(HttpServletRequest request, @PathVariable(value = "routine-id", required = false) Integer routineId, @RequestBody RoutineDto routineDto) {
        int userId = (Integer) request.getAttribute("userId");

        routineDto.setUserId(userId);
        LocalDateTime now = LocalDateTime.now();

        if (routineDto.getDueDate() != null && routineDto.getDueDate().isBefore(now.toLocalDate())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("루틴 마감일은 현재 날짜 이후로 설정해야 합니다.");
        }

        // 루틴이 새로 생성되는 경우 createdAt 필드를 설정
        if (routineId == null) {
            routineDto.setCreatedAt(Timestamp.valueOf(now));
        } else {
            routineDto.setId(routineId);
            // 루틴이 존재하는지 확인
            RoutineDto existingRoutine = workoutRoutineService.getRoutineById(routineId, userId);
            if (existingRoutine == null) {
                // 존재하지 않는 루틴이면 createdAt 필드를 설정
                routineDto.setCreatedAt(Timestamp.valueOf(now));
            } else {
                // 존재하는 루틴이면 createdAt 필드를 유지
                routineDto.setCreatedAt(existingRoutine.getCreatedAt());
                // 기존 루틴의 complete 정보도 유지
                routineDto.setComplete(existingRoutine.isComplete());
            }
        }

        int result = workoutRoutineService.upsertRoutine(routineDto);
        if (result != 0) {
            return ResponseEntity.ok("루틴 저장 또는 업데이트 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 저장 또는 업데이트 실패");
    }

    @Operation(summary = "루틴 삭제", description = "루틴 ID를 사용하여 루틴을 삭제합니다.")
    @DeleteMapping("/{routine-id}")
    public ResponseEntity<?> deleteRoutine(HttpServletRequest request, @PathVariable("routine-id") int routineId) {
        int userId = (Integer) request.getAttribute("userId");

        int result = workoutRoutineService.deleteRoutine(routineId, userId);
        if (result != 0) {
            return ResponseEntity.ok("루틴 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 삭제 실패");
    }

    @Operation(summary = "루틴 완료 처리", description = "루틴 ID를 사용하여 루틴을 완료 처리합니다.")
    @PutMapping("/{routine-id}/complete")
    public ResponseEntity<?> completeRoutine(HttpServletRequest request, @PathVariable("routine-id") int routineId) {
        int userId = (Integer) request.getAttribute("userId");

        LocalDateTime now = LocalDateTime.now();
        int result = workoutRoutineService.completeRoutine(routineId, userId, now);
        if (result != 0) {
            return ResponseEntity.ok("루틴 완료 성공");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 완료 실패");
    }

    @Operation(summary = "루틴 찜하기/찜 해제", description = "루틴을 찜하거나 찜 해제합니다.")
    @PutMapping("/{routine-id}/like")
    public ResponseEntity<?> toggleLikeRoutine(HttpServletRequest request, @PathVariable("routine-id") int routineId) {
        int userId = (Integer) request.getAttribute("userId");

        boolean isLiked = workoutRoutineService.toggleLikeRoutine(routineId, userId);
        if (isLiked) {
            return ResponseEntity.ok("루틴 찜하기 성공");
        } else {
            return ResponseEntity.ok("루틴 찜 해제 성공");
        }
    }

}
