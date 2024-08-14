package com.ssafy.back_end.oauth.infra.oauth.github.authcode;

import com.ssafy.back_end.oauth.domain.OauthServerType;
import com.ssafy.back_end.oauth.domain.authcode.AuthCodeRequestUrlProvider;
import com.ssafy.back_end.oauth.infra.oauth.github.GithubOauthConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class GithubAuthCodeRequestUrlProvider implements AuthCodeRequestUrlProvider {

    private final GithubOauthConfig githubOauthConfig;

    @Override
    public OauthServerType supportServer() { return OauthServerType.GITHUB; }

    @Override
    public String provide() {
        String scope = githubOauthConfig.getScope() != null
                ? String.join(",", githubOauthConfig.getScope())
                : "";

        return UriComponentsBuilder
                .fromUriString("https://github.com/login/oauth/authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", githubOauthConfig.getClientId())
                .queryParam("redirect_uri", githubOauthConfig.getRedirectUri())
                .queryParam("scope", scope)
                .toUriString();
    }
}
