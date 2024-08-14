package com.ssafy.back_end.oauth.infra.oauth.github.client;

import com.ssafy.back_end.oauth.infra.oauth.github.dto.GithubMemberResponse;
import com.ssafy.back_end.oauth.infra.oauth.github.dto.GithubToken;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

public interface GithubApiClient {

    @PostExchange(url = "https://github.com/login/oauth/access_token", contentType = APPLICATION_FORM_URLENCODED_VALUE)
    GithubToken fetchToken(@RequestParam MultiValueMap<String, String> params);

    @GetExchange("https://api.github.com/user")
    GithubMemberResponse fetchMember(@RequestHeader(name = AUTHORIZATION) String bearerToken);
}
