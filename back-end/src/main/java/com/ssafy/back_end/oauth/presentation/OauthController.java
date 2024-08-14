package com.ssafy.back_end.oauth.presentation;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserLoginService;
import com.ssafy.back_end.auth.service.UserRegisterService;
import com.ssafy.back_end.oauth.domain.OauthMember;
import com.ssafy.back_end.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import com.ssafy.back_end.oauth.application.OauthService;
import com.ssafy.back_end.oauth.domain.OauthServerType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/oauth")
@RestController
public class OauthController {

    private final OauthService oauthService;
    private final UserLoginService userLoginService;
    private final JwtUtil jwtUtil;

    @SneakyThrows
    @GetMapping("/{oauthServerType}")
    ResponseEntity<Void> redirectAuthCodeRequestUrl(
            @PathVariable OauthServerType oauthServerType,
            HttpServletResponse response
    ) {
        String redirectUrl = oauthService.getAuthCodeRequestUrl(oauthServerType);
        response.sendRedirect(redirectUrl);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/login/{oauthServerType}")
    ResponseEntity<?> login(
            @PathVariable OauthServerType oauthServerType,
            @RequestParam("code") String code
    ) {
        OauthMember oauthMember = oauthService.login(oauthServerType, code);

        if(oauthMember != null) {
            // JWT 생성 및 저장
            String accessToken = jwtUtil.createAccessToken(oauthMember.getUserId());
            String refreshToken = jwtUtil.createRefreshToken(oauthMember.getUserId());
            userLoginService.storeRefreshToken(oauthMember.getUserId(), refreshToken);

            // 응답 생성
            UserResponse userResponse = new UserResponse(
                    oauthMember.getUserId(),
                    oauthMember.getEmail(),
                    oauthMember.isSign(),
                    accessToken,
                    refreshToken
            );
            return ResponseEntity.ok(userResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    // 응답 데이터 클래스
    public static class UserResponse {
        private int userId;
        private String email;
        private boolean isSign;
        private String accessToken;
        private String refreshToken;

        public UserResponse(int userId, String email, boolean isSign, String accessToken, String refreshToken) {
            this.userId = userId;
            this.email = email;
            this.isSign = isSign;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }

        // Getters and Setters
        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public boolean isSign() {
            return isSign;
        }

        public void setSign(boolean sign) {
            isSign = sign;
        }

        public String getAccessToken() {
            return accessToken;
        }

        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }

        public String getRefreshToken() {
            return refreshToken;
        }

        public void setRefreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
        }
    }
}
