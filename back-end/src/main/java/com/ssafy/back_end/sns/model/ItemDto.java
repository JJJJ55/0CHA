package com.ssafy.back_end.sns.model;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
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

    private int likeCount;
    private String nickname;
    private String profileImage;
    private List<String> images;
    private int isLike;
}