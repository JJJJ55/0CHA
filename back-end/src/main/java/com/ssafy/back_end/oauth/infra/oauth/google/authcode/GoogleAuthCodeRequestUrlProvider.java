package com.ssafy.back_end.oauth.infra.oauth.google.authcode;

import com.ssafy.back_end.oauth.domain.OauthServerType;
import com.ssafy.back_end.oauth.domain.authcode.AuthCodeRequestUrlProvider;
import com.ssafy.back_end.oauth.infra.oauth.google.GoogleOauthConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class GoogleAuthCodeRequestUrlProvider implements AuthCodeRequestUrlProvider {

    private final GoogleOauthConfig googleOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.GOOGLE;
    }

    @Override
    public String provide() {
        String scope = googleOauthConfig.getScope() != null
                ? String.join(" ", googleOauthConfig.getScope())
                : "";

        return UriComponentsBuilder
                .fromUriString("https://accounts.google.com/o/oauth2/v2/auth")
                .queryParam("response_type", "code")
                .queryParam("client_id", googleOauthConfig.getClientId())
                .queryParam("redirect_uri", googleOauthConfig.getRedirectUri())
                .queryParam("scope", scope)
                .queryParam("access_type", "offline") // Optional: If you want refresh token
                .queryParam("prompt", "consent") // Optional: To force the consent screen to show
                .toUriString();
    }
}
