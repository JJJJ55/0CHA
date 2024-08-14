package com.ssafy.back_end.oauth.application;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserRegisterService;
import lombok.RequiredArgsConstructor;
import com.ssafy.back_end.oauth.domain.OauthMember;
import com.ssafy.back_end.oauth.domain.OauthMemberRepository;
import com.ssafy.back_end.oauth.domain.OauthServerType;
import com.ssafy.back_end.oauth.domain.authcode.AuthCodeRequestUrlProviderImpl;
import com.ssafy.back_end.oauth.domain.client.OauthMemberClientImpl;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OauthService {

    private final AuthCodeRequestUrlProviderImpl authCodeRequestUrlProviderImpl;
    private final OauthMemberClientImpl oauthMemberClientImpl;
    private final OauthMemberRepository oauthMemberRepository;
    private final UserRegisterService userRegisterService;

    // 소셜 로그인 서버 유형에 대한 인가 코드 요청 URL 반환
    public String getAuthCodeRequestUrl(OauthServerType oauthServerType) {
        return authCodeRequestUrlProviderImpl.provide(oauthServerType);
    }

    // 소셜 로그인 서버로부터 사용자의 정보를 가져와 로그인 or 회원가입 처리
    public OauthMember login(OauthServerType oauthServerType, String authCode) {
        // Oauth 객체 반환(사용자 정보가 있는 부분)
        OauthMember oauthMember = oauthMemberClientImpl.fetch(oauthServerType, authCode);

        // 1. 주어진 OAuth ID로 데이터베이스에서 사용자 조회
        Optional<OauthMember> optionalMember = oauthMemberRepository.findByOauthId(oauthMember.oauthId());

        OauthMember saved;
        if (optionalMember.isPresent()) {
            // 2. 사용자가 데이터베이스에 존재하면 해당 사용자 반환
            saved = optionalMember.get();
            // 이메일이 유저 테이블에 존재하는지 확인
            boolean emailExists = isEmailInUserTable(oauthMember.getEmail());
            saved.setSign(emailExists);

            if (saved.isSign()) {
                // 이메일이 존재하면 user_Id 업데이트
                UserDto userDto = userRegisterService.findByEmail(oauthMember.getEmail());
                saved.setUserId(userDto.getId()); // 소셜 테이블의 user_Id를 업데이트
            }
        } else {
            // 3. 사용자가 데이터베이스에 없으면 새로운 사용자 저장
            saved = oauthMemberRepository.save(oauthMember);
            saved.setSign(false); // 기본값은 false
        }

        System.out.println(saved.isSign());
        // 저장된 객체를 업데이트
        oauthMemberRepository.save(saved);

        // 4. 최종적으로 존재하거나 새로 저장한 사용자 반환
        return saved;
    }

    // 이메일이 유저 테이블에 존재하는지를 확인하는 메서드
    private boolean isEmailInUserTable(String email) {
        // UserDto를 사용하여 이메일 존재 여부 확인
        // 이메일로 유저를 조회하여 결과를 반환
        UserDto userDto = userRegisterService.findByEmail(email); // 이메일로 UserDto 조회
        return userDto != null;
    }
}
