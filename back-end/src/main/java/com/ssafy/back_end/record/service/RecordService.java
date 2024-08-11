package com.ssafy.back_end.record.service;

import com.ssafy.back_end.record.model.RecordDto;
import com.ssafy.back_end.record.model.RecordInbodyDto;
import com.ssafy.back_end.record.model.RoutineListDto;

import java.util.List;

public interface RecordService {
    List<RecordInbodyDto> getInbody(int userId);   //인바디 결과 조회

    int insertInbody(RecordInbodyDto recordInbodyDto);   //인바디 결과 저장

    List<RecordDto> getRecentExerciseRecords(int userId);

    List<RoutineListDto> getUserRoutines(int userId);

}
