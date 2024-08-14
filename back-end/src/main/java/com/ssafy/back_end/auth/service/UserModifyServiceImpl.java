package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.mapper.UserModifyMapper;
import com.ssafy.back_end.auth.model.UserDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

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

    //    public void sendEmail(String email, int authCode) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("qqa109@naver.com");
//        message.setTo(email);
//        message.setSubject("이메일 인증입니다.");
//        message.setText("이메일 인증 코드입니다. (" + authCode + ") ");
//        javaMailSender.send(message);
//    }
    public void sendEmail(String email, int authCode) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            // 발신자 이메일과 발신자 이름 설정
            messageHelper.setFrom(new InternetAddress("qqa109@naver.com", "0CHA헬스", "UTF-8"));
            messageHelper.setTo(email);
            messageHelper.setSubject("이메일 인증입니다.");
            messageHelper.setText("이메일 인증 코드입니다. (" + authCode + ") ", true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException | UnsupportedEncodingException e) {
            // 에러 처리
            System.err.println("이메일 전송 중 오류가 발생했습니다: " + e.getMessage());
            e.printStackTrace();  // 에러 스택 트레이스를 출력합니다.
            // 필요한 경우, 사용자에게 적절한 에러 메시지를 반환하거나 로그를 남기는 등의 추가 처리를 여기에 추가할 수 있습니다.
        }
    }
}
