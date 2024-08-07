package com.ssafy.back_end.record.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordInbodyDto {
    private int id;
    private int userId;
    private double height;
    private double weight;
    private double bodyWater;
    private double protein;
    private double mineral;
    private double bodyFat;
    private double muscleMass;
    private double muscleBody;
    private double muscleLeftArm;
    private double muscleRightArm;
    private double muscleLeftLeg;
    private double muscleRightLeg;
    private double bmi;
    private double bodyFatPercent;
    private Date measuredAt;
}
