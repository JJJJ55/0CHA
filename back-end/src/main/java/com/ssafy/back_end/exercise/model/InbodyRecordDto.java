package com.ssafy.back_end.exercise.model;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InbodyRecordDto {
    private int id;
    private int userId;
    private double height;
    private double weight;
    private double bodyWater;
    private double protein;
    private double bodyFat;
    private double mineral;
    private double muscleMass;
    private double muscleBody;
    private double muscleLeftArm;
    private double muscleRightArm;
    private double muscleLeftLeg;
    private double muscleRightLeg;
    private double bmi;
    private double bodyFatPercent;
    private Timestamp measuredAt;

}
