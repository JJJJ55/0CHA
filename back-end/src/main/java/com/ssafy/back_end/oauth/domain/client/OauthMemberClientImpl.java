package com.ssafy.back_end.oauth.domain.client;

import com.ssafy.back_end.oauth.domain.OauthMember;
import com.ssafy.back_end.oauth.domain.OauthServerType;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

@Component
public class OauthMemberClientImpl {

    private final Map<OauthServerType, OauthMemberClient> mapping;

    public OauthMemberClientImpl(Set<OauthMemberClient> clients) {
        mapping = clients.stream()
                .collect(toMap(
                        OauthMemberClient::supportServer,
                        identity()
                ));
    }

    // 사용자 정보 가져오는 method
    public OauthMember fetch(OauthServerType oauthServerType, String authCode) {
        return getClient(oauthServerType).fetch(authCode);
    }

    private OauthMemberClient getClient(OauthServerType oauthServerType) {
        return Optional.ofNullable(mapping.get(oauthServerType))
                .orElseThrow(() -> new RuntimeException("지원하지 않는 소셜 로그인 타입입니다."));
    }
}