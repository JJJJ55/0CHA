package com.ssafy.back_end.oauth.domain;

import java.util.Optional;

import com.ssafy.back_end.oauth.domain.OauthId;
import org.springframework.data.jpa.repository.JpaRepository;

// JPA의 Jpa repository를 상속받아 자동으로 CRUD를 지원
public interface OauthMemberRepository extends JpaRepository<com.ssafy.back_end.oauth.domain.OauthMember, Long> {

    // OauthMember 객체를 저장하고, 조회하는 기능 제공
    Optional<com.ssafy.back_end.oauth.domain.OauthMember> findByOauthId(OauthId oauthId);
}