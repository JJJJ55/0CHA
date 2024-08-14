package com.ssafy.back_end.oauth.infra.oauth.google.dto;

import com.ssafy.back_end.oauth.domain.OauthId;
import com.ssafy.back_end.oauth.domain.OauthMember;
import static com.ssafy.back_end.oauth.domain.OauthServerType.GOOGLE;

public record GoogleMemberResponse(
        String id,
        String email,
        String name,
        String givenName,
        String familyName,
        String picture
) {
    public OauthMember toDomain() {
        return OauthMember.builder()
                .oauthId(new OauthId(id, GOOGLE))
                .nickname(name) // or you can choose to use givenName, familyName, etc.
                .email(email)
                .build();
    }
}
