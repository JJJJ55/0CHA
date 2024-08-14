package com.ssafy.back_end.oauth.infra.oauth.kakao.authcode;

import com.ssafy.back_end.oauth.domain.OauthServerType;
import com.ssafy.back_end.oauth.domain.authcode.AuthCodeRequestUrlProvider;
import com.ssafy.back_end.oauth.infra.oauth.kakao.KakaoOauthConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class KakaoAuthCodeRequestUrlProvider implements AuthCodeRequestUrlProvider {

    private final KakaoOauthConfig kakaoOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.KAKAO;
    }

    @Override
    public String provide() {
        String scope = kakaoOauthConfig.getScope() != null
                ? String.join(",", kakaoOauthConfig.getScope())
                : "";

        return UriComponentsBuilder
                .fromUriString("https://kauth.kakao.com/oauth/authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", kakaoOauthConfig.getClientId())
                .queryParam("redirect_uri", kakaoOauthConfig.getRedirectUri())
                .queryParam("scope", scope)
                .toUriString();
    }
}
