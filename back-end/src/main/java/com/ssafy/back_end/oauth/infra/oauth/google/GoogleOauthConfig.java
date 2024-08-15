package com.ssafy.back_end.oauth.infra.oauth.google;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.google")
@Component
@Getter
@Setter
public class GoogleOauthConfig {

    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private List<String> scope;
}
