package com.ssafy.back_end.exercise.service;

import com.ssafy.back_end.exercise.mapper.WorkoutRoutineMapper;
import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineDetailDto;
import com.ssafy.back_end.exercise.model.RoutineSetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WorkoutRoutineServiceImpl implements WorkoutRoutineService {

    private final WorkoutRoutineMapper workoutRoutineMapper;

    @Autowired
    public WorkoutRoutineServiceImpl(WorkoutRoutineMapper workoutRoutineMapper) {
        this.workoutRoutineMapper = workoutRoutineMapper;
    }

    @Override
    public List<RoutineDto> getAllUsersRoutines() {
        return workoutRoutineMapper.getAllUsersRoutines();
    }

    @Override
    public List<RoutineDto> getAllRoutines(int userId) {
        return workoutRoutineMapper.getAllRoutines(userId);
    }

    @Override
    public RoutineDto getRoutineById(int routineId, int userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("routineId", routineId);
        params.put("userId", userId);
        RoutineDto routine = workoutRoutineMapper.getRoutineByIdAndUserId(params);
        if (routine != null) {
            List<RoutineDetailDto> details = workoutRoutineMapper.getRoutineDetailsByRoutineId(routineId);
            for (RoutineDetailDto detail : details) {
                List<RoutineSetDto> sets = workoutRoutineMapper.getSetsByRoutineDetailId(detail.getId());
                detail.setSets(sets);
            }
            routine.setDetails(details);
        }
        return routine;
    }

    @Override
    public int upsertRoutine(RoutineDto routineDto) {
        // 루틴 존재 여부 확인
        Map<String, Object> params = new HashMap<>();
        params.put("routineId", routineDto.getId());
        params.put("userId", routineDto.getUserId());

        RoutineDto existingRoutine = workoutRoutineMapper.getRoutineByIdAndUserId(params);

        if (existingRoutine == null) {
            // 루틴이 존재하지 않으면 생성
            workoutRoutineMapper.createRoutine(routineDto);
            routineDto.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        } else {
            // 루틴이 존재하면 업데이트
            workoutRoutineMapper.updateRoutine(routineDto);
            workoutRoutineMapper.deleteRoutineDetailsByRoutineId(routineDto.getId());
            workoutRoutineMapper.deleteRoutineSetsByRoutineId(routineDto.getId());
        }

        int routineId = routineDto.getId(); // 생성된 루틴 ID를 가져옴

        for (RoutineDetailDto detail : routineDto.getDetails()) {
            detail.setRoutineId(routineId); // 루틴 ID 설정
            workoutRoutineMapper.createRoutineDetail(detail);
            int routineDetailId = detail.getId(); // 생성된 루틴 상세 정보 ID를 가져옴
            for (RoutineSetDto set : detail.getSets()) {
                set.setRoutineDetailId(routineDetailId); // 루틴 상세 정보 ID 설정
                workoutRoutineMapper.createRoutineSet(set);
            }
        }

        return 1; // 성공 시 1을 반환
    }

    @Override
    public int deleteRoutine(int routineId, int userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("routineId", routineId);
        params.put("userId", userId);

        // 루틴에 연결된 모든 세트 삭제
        workoutRoutineMapper.deleteRoutineSetsByRoutineId(routineId);

        // 루틴에 연결된 모든 상세 정보 삭제
        workoutRoutineMapper.deleteRoutineDetailsByRoutineId(routineId);

        // 루틴 삭제
        return workoutRoutineMapper.deleteRoutine(params);
    }

    @Override
    public int completeRoutine(int routineId, int userId, LocalDateTime completedAt) {
        Map<String, Object> params = new HashMap<>();
        params.put("routineId", routineId);
        params.put("userId", userId);
        params.put("completedAt", Timestamp.valueOf(completedAt));
        return workoutRoutineMapper.completeRoutine(params);
    }

    @Override
    public boolean toggleLikeRoutine(int routineId, int userId) {
        boolean isLiked = workoutRoutineMapper.isRoutineLiked(routineId, userId);
        if (isLiked) {
            workoutRoutineMapper.unlikeRoutine(routineId, userId);
            return false;
        } else {
            workoutRoutineMapper.likeRoutine(routineId, userId);
            return true;
        }
    }
}
