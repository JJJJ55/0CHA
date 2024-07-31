package com.ssafy.back_end.sns.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private int id;
    private int userId;
    private String title;
    private String content;
    private int price;
    private int isSold;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String district;
    private String siGunGu;
}