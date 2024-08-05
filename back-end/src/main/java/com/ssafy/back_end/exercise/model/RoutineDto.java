package com.ssafy.back_end.exercise.model;

import lombok.*;

import java.sql.Time;
import java.sql.Timestamp;

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
    private Time sumTime;
    private Timestamp createdAt;
    private boolean isUpload;
    private boolean isComplete;
    private Timestamp completedAt;
    private boolean isLike;
    private Timestamp dueDate;
}
