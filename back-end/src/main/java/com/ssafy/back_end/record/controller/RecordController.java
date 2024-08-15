package com.ssafy.back_end.record.controller;

import com.ssafy.back_end.record.model.ExerciseOneRepMaxDto;
import com.ssafy.back_end.record.model.RecordDto;
import com.ssafy.back_end.record.model.RecordInbodyDto;
import com.ssafy.back_end.record.model.RoutineListDto;
import com.ssafy.back_end.record.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "기록페이지")
@RestController
@RequestMapping(value = "/api/record")
public class RecordController {
    private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @Operation(summary = "인바디 결과조회")
    @GetMapping("/inbody")
    public ResponseEntity<?> getItems(HttpServletRequest request) {
        int ID = (Integer) request.getAttribute("userId");
        List<RecordInbodyDto> inbody = recordService.getInbody(ID);

        if (inbody != null) {
            if (inbody.isEmpty()) {
                return ResponseEntity.ok("인바디 0개입니다");
            }
            return ResponseEntity.ok(inbody);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("인바디 조회 오류");
    }

    @Operation(summary = "인바디 결과등록")
    @PostMapping("/inbody")
    public ResponseEntity<?> insertInbody(HttpServletRequest request, @RequestBody RecordInbodyDto recordInbodyDto) {
        int ID = (Integer) request.getAttribute("userId");
        recordInbodyDto.setUserId(ID);
        int result = recordService.insertInbody(recordInbodyDto);

        if (result > 0) {
            return ResponseEntity.ok("인바디 결과등록 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("인바디 결과등록 오류");
    }

    @Operation(summary = "최근 운동 기록 조회", description = "최근 5개의 운동 기록을 조회합니다.")
    @GetMapping("/exercise-records")
    public ResponseEntity<?> getRecentExerciseRecords(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        List<RecordDto> records = recordService.getRecentExerciseRecords(userId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/record/rm/{exerciseId}")
    public ResponseEntity<?> getOneRepMaxForExercise(@PathVariable int exerciseId, HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        List<ExerciseOneRepMaxDto> oneRepMaxList = recordService.getOneRepMaxForExercise(userId, exerciseId);
        return ResponseEntity.ok(oneRepMaxList);
    }

    @Operation(summary = "사용자의 루틴 리스트 조회", description = "사용자의 루틴 리스트를 조회합니다.")
    @GetMapping("/routines")
    public ResponseEntity<?> getUserRoutines(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        List<RoutineListDto> routines = recordService.getUserRoutines(userId);
        return ResponseEntity.ok(routines);
    }
}