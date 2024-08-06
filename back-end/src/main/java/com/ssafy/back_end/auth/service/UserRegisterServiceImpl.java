package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.mapper.UserRegisterMapper;
import com.ssafy.back_end.auth.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class UserRegisterServiceImpl implements UserRegisterService {
    private final UserRegisterMapper userRegisterMapper;
    private final JavaMailSender javaMailSender;

    @Autowired
    public UserRegisterServiceImpl(UserRegisterMapper userRegisterMapper, JavaMailSender javaMailSender) {
        this.userRegisterMapper = userRegisterMapper;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public int register(UserDto userDto) {
        UserDto user = UserDto.builder()
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .name(userDto.getName())
                .nickname(userDto.getNickname())
                .phone(userDto.getPhone())
                .birth(userDto.getBirth())
                .build();
        userRegisterMapper.register(user);

        return user.getId();
    }

    @Override
    public int userInfo(UserDto userDto) {
        UserDto user = UserDto.builder()
                .gender(userDto.getGender())
                .height(userDto.getHeight())
                .weight(userDto.getWeight())
                .district(userDto.getDistrict())
                .siGunGu(userDto.getSiGunGu())
                .id(userDto.getId())
                .build();
        return userRegisterMapper.userInfo(user);
    }

    @Override
    public int checkEmail(String email) {
        return userRegisterMapper.checkEmail(email);
    }

    @Override
    public int checkNickname(String nickname) {
        return userRegisterMapper.checkNickname(nickname);
    }

    public void sendEmail(String email, int authCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("qqa109@naver.com");
        message.setTo(email);
        message.setSubject("이메일 인증입니다.");
        message.setText("이메일 인증 코드입니다. (" + authCode + ") ");

        javaMailSender.send(message);
    }
}
