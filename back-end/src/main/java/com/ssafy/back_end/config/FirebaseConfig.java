package com.ssafy.back_end.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {
    // GOOGLE_APPLICATION_CREDENTIALS 라는 이름으로 환경변수 만들어야해요
    // https://firebase.google.com/?hl=ko 접속
    // 시작하기 -> 프로젝트 만들기 -> 프로젝트 개요 옆 설정에서 프로젝트 설정 -> 서비스 계정 ->
    // Firebase Admin SDK 자바 버전으로 키 생성 -> json파일 다운로드 -> 본인 로컬 폴더에 넣고 경로+파일명으로 환경변수 설정

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
//        String serviceAccountPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
////        System.out.println("serviceAccountPath : " + serviceAccountPath);
//        FileInputStream serviceAccount =
//                new FileInputStream(serviceAccountPath);
//        FileInputStream serviceAccount =
//                new FileInputStream("src/main/resources/serviceAccountKey.json");
        FileInputStream serviceAccount =
                new FileInputStream("/app/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.getInstance();
    }
}
