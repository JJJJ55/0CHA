package com.ssafy.back_end.exercise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoutineSetDto {
    @JsonIgnore
    private int id;
    @JsonIgnore
    private int routineDetailId;
    private int sequence;
    private int weight;
    private int count;
    private boolean complete; // 변수명을 'complete'로 변경

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }
}

