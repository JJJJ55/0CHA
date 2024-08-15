package com.ssafy.back_end.main.service;

import com.ssafy.back_end.main.mapper.MainMapper;
import com.ssafy.back_end.main.model.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final MainMapper mainMapper;
    private final FcmService fcmService;

    @Autowired
    public NotificationService(MainMapper mainMapper, FcmService fcmService) {
        this.mainMapper = mainMapper;
        this.fcmService = fcmService;
    }

    public void sendLikeNotification(int userIdA, int userIdB) {
        UserInfoDto userA = mainMapper.getUserInfo(userIdA);
        String targetToken = mainMapper.getFcmTokenById(userIdB);
//        User userB = userRepository.findById(userIdB).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        String title = "좋아요";
        String body = userA.getNickname() + " 유저가 당신의 글에 좋아요를 눌렀습니다.";
        fcmService.sendNotification(targetToken, title, body);
    }

    public void sendCommentNotification(int userIdA, int userIdB, String comment) {
        UserInfoDto userA = mainMapper.getUserInfo(userIdA);
        String targetToken = mainMapper.getFcmTokenById(userIdB);

        String title = "댓글";
        String body = userA.getNickname() + " 유저가 당신의 글에 댓글을 남겼습니다: " + comment;
        fcmService.sendNotification(targetToken, title, body);
    }

    public void sendFollowNotification(int userIdA, int userIdB) {
        UserInfoDto userA = mainMapper.getUserInfo(userIdA);
        UserInfoDto userB = mainMapper.getUserInfo(userIdB);
        String targetToken = mainMapper.getFcmTokenById(userIdB);

        String title = "팔로우";
        String body = userA.getNickname() + " 유저가 당신을 팔로우 했습니다.";
        fcmService.sendNotification(targetToken, title, body);
    }

    public void sendChattingNotification(int userIdA, int userIdB, String message) {
        UserInfoDto userA = mainMapper.getUserInfo(userIdA);
        String targetToken = mainMapper.getFcmTokenById(userIdB);

        String title = "채팅";
        String body = userA.getNickname() + " 유저가 당신에게 메시지를 보냈습니다: " + message;
        fcmService.sendNotification(targetToken, title, body);
    }

}
