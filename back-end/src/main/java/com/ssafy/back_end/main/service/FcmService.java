package com.ssafy.back_end.main.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

@Service
public class FcmService {

    public void sendNotification(String targetToken, String title, String body) {
        // Firebase 앱이 올바르게 초기화되었는지 확인
        if (FirebaseApp.getApps().isEmpty()) {
            System.out.println("Firebase App is not initialized. Please check your Firebase configuration.");
            return;
        }

        // 메시지 빌드
        Message message = Message.builder()
                .setToken(targetToken)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();

        // 초기화된 Firebase 앱 목록 확인 (디버깅용)
        System.out.println("Firebase Apps: " + FirebaseApp.getApps());

        try {
            // 메시지 전송 시도
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);
        } catch (Exception e) {
            // 예외 처리 및 오류 메시지 출력
            System.out.println("Failed to send message. Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
