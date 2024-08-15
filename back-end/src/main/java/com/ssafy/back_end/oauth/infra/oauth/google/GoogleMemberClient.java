package com.ssafy.back_end.oauth.infra.oauth.google;

import com.ssafy.back_end.oauth.domain.OauthMember;
import com.ssafy.back_end.oauth.domain.OauthServerType;
import com.ssafy.back_end.oauth.domain.client.OauthMemberClient;
import com.ssafy.back_end.oauth.infra.oauth.google.client.GoogleApiClient;
import com.ssafy.back_end.oauth.infra.oauth.google.dto.GoogleMemberResponse;
import com.ssafy.back_end.oauth.infra.oauth.google.dto.GoogleToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class GoogleMemberClient implements OauthMemberClient {

    private final GoogleApiClient googleApiClient;
    private final GoogleOauthConfig googleOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.GOOGLE;
    }

    @Override
    public OauthMember fetch(String authCode) {
        GoogleToken tokenInfo = googleApiClient.fetchToken(tokenRequestParams(authCode)); // (1)
        System.out.println(authCode + " - " + tokenInfo.toString());
        GoogleMemberResponse googleMemberResponse =
                googleApiClient.fetchMember("Bearer " + tokenInfo.accessToken());  // (2)
        return googleMemberResponse.toDomain();  // (3)
    }

    private MultiValueMap<String, String> tokenRequestParams(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", googleOauthConfig.getClientId());
        params.add("client_secret", googleOauthConfig.getClientSecret());
        params.add("redirect_uri", googleOauthConfig.getRedirectUri());
        params.add("code", authCode);
        return params;
    }
}
