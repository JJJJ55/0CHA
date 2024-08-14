package com.ssafy.back_end.exercise.model;

import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoutineDto {
    private int id;
    private int userId;
    private String title;
    private Double sumVolume;
    private int sumTime;
    private Timestamp createdAt;
    private boolean isUpload;
    private boolean isComplete;
    private Timestamp completedAt;
    private boolean isLike;
    private LocalDate dueDate;
    private List<RoutineDetailDto> details;
}

