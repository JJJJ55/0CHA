package com.ssafy.back_end.record.controller;

import com.ssafy.back_end.record.model.RecordInbodyDto;
import com.ssafy.back_end.record.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag (name = "기록페이지")
@RestController
@RequestMapping (value = "/api/record")
public class RecordController {
    private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @Operation (summary = "인바디 결과조회")
    @GetMapping ("/inbody")
    public ResponseEntity<?> getItems(HttpServletRequest request) {
        int ID = (Integer)request.getAttribute("userId");
        List<RecordInbodyDto> inbody = recordService.getInbody(ID);

        if (inbody != null) {
            if (inbody.isEmpty()) {
                return ResponseEntity.ok("인바디 0개입니다");
            }
            return ResponseEntity.ok(inbody);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("인바디 조회 오류");
    }

    @Operation (summary = "인바디 결과등록")
    @PostMapping ("/inbody")
    public ResponseEntity<?> insertInbody(HttpServletRequest request, @RequestBody RecordInbodyDto recordInbodyDto) {
        int ID = (Integer)request.getAttribute("userId");
        recordInbodyDto.setUserId(ID);
        int result = recordService.insertInbody(recordInbodyDto);

        if (result > 0) {
            return ResponseEntity.ok("인바디 결과등록 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("인바디 결과등록 오류");
    }

}
