package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.mapper.UserModifyMapper;
import com.ssafy.back_end.auth.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class UserModifyServiceImpl implements UserModifyService {
    private final UserModifyMapper userModifyMapper;
    private final JavaMailSender javaMailSender;

    @Autowired
    public UserModifyServiceImpl(UserModifyMapper userModifyMapper, JavaMailSender javaMailSender) {
        this.userModifyMapper = userModifyMapper;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public String findEmail(UserDto userDto) {
        UserDto user = UserDto.builder()
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .build();
        return userModifyMapper.findEmail(user);
    }

    @Override
    public int findPassword(UserDto userDto) {
        UserDto user = UserDto.builder()
                .email(userDto.getEmail())
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .build();
        return userModifyMapper.findPassword(user);
    }

    @Override
    public int resetPassword(UserDto userDto) {
        UserDto user = UserDto.builder()
                .password(userDto.getPassword())
                .email(userDto.getEmail())
                .build();
        return userModifyMapper.resetPassword(user);
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
