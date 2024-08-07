package com.ssafy.back_end.record.service;

import com.ssafy.back_end.record.mapper.RecordMapper;
import com.ssafy.back_end.record.model.RecordInbodyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {
    private final RecordMapper recordMapper;

    @Autowired
    public RecordServiceImpl(RecordMapper recordMapper) {
        this.recordMapper = recordMapper;
    }

    @Override
    public List<RecordInbodyDto> getInbody(int userId) {
        return recordMapper.getInbody(userId);
    }

    @Override
    public int insertInbody(RecordInbodyDto recordInbodyDto) {
        return recordMapper.insertInbody(recordInbodyDto);
    }
}
