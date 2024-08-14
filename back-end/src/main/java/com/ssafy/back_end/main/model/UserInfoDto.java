package com.ssafy.back_end.main.model;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private int id;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phone;
    private Date birth;
    private String profileImage;
    private int gender;
    private double height;
    private double weight;
    private String district;
    private String siGunGu;
}
