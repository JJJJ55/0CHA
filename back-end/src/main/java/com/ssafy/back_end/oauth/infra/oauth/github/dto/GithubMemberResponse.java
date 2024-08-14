package com.ssafy.back_end.oauth.infra.oauth.github.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;
import com.ssafy.back_end.oauth.domain.OauthId;
import com.ssafy.back_end.oauth.domain.OauthMember;
import static com.ssafy.back_end.oauth.domain.OauthServerType.GITHUB;

@JsonNaming(SnakeCaseStrategy.class)
public record GithubMemberResponse(
        Long id,
        boolean hasSignedUp,
        LocalDateTime connectedAt,
        GithubAccount githubAccount
) {

    public OauthMember toDomain() {
        return OauthMember.builder()
                .oauthId(new OauthId(String.valueOf(id), GITHUB))
                .nickname(githubAccount.profile.nickname)
                .email(githubAccount.email)
                .build();
    }

    @JsonNaming(SnakeCaseStrategy.class)
    public record GithubAccount(
            Profile profile,
            String email
    ) {
    }

    @JsonNaming(SnakeCaseStrategy.class)
    public record Profile(
            String nickname
    ) {
    }
}
