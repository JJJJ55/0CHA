package com.ssafy.back_end.record.mapper;

import com.ssafy.back_end.record.model.RecordDto;
import com.ssafy.back_end.record.model.RecordInbodyDto;
import com.ssafy.back_end.record.model.RoutineListDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RecordMapper {

    List<RecordInbodyDto> getInbody(@Param ("userId") int userId);   //인바디 결과 조회

    int insertInbody(RecordInbodyDto recordInbodyDto);   //인바디 결과 저장

    List<RecordDto> getRecentExerciseRecords(@Param("userId") int userId);

    List<RoutineListDto> getUserRoutines(@Param("userId") int userId);
}
