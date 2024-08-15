package com.ssafy.back_end.oauth.infra.oauth.github;

import com.ssafy.back_end.oauth.domain.OauthMember;
import com.ssafy.back_end.oauth.domain.OauthServerType;
import com.ssafy.back_end.oauth.domain.client.OauthMemberClient;
import com.ssafy.back_end.oauth.infra.oauth.github.client.GithubApiClient;
import com.ssafy.back_end.oauth.infra.oauth.github.dto.GithubMemberResponse;
import com.ssafy.back_end.oauth.infra.oauth.github.dto.GithubToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class GithubMemberClient implements OauthMemberClient {

    private final GithubApiClient githubApiClient;
    private final GithubOauthConfig githubOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.GITHUB;
    }

    @Override
    public OauthMember fetch(String authCode) {
        GithubToken tokenInfo = githubApiClient.fetchToken(tokenRequestParams(authCode)); // (1)
        GithubMemberResponse githubMemberResponse =
                githubApiClient.fetchMember("Bearer " + tokenInfo.accessToken());  // (2)
        return githubMemberResponse.toDomain();  // (3)
    }

    private MultiValueMap<String, String> tokenRequestParams(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", githubOauthConfig.getClientId());
        params.add("client_secret", githubOauthConfig.getClientSecret());
        params.add("redirect_uri", githubOauthConfig.getRedirectUri());
        params.add("code", authCode);
        return params;
    }
}
