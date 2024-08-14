package com.ssafy.back_end.config;

import com.ssafy.back_end.auth.service.UserLoginService;
import com.ssafy.back_end.util.JwtAuthenticationEntryPoint;
import com.ssafy.back_end.util.JwtAuthenticationFilter;
import com.ssafy.back_end.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final UserLoginService userLoginService; // 추가된 부분

    public SecurityConfig(JwtUtil jwtUtil, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, UserLoginService userLoginService) {
        this.jwtUtil = jwtUtil;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.userLoginService = userLoginService; // 추가된 부분
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // 새로운 방식으로 CSRF 비활성화
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)) // 인증 실패 시 처리 로직 설정
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션을 사용하지 않도록 설정
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(
                                        "/api/auth/login/login",
                                        "/api/auth/login/refresh",
                                        "/api/auth/register/**",
                                        "/api/auth/modify/**",
                                        "/api/redis/**",
                                        "/v3/api-docs/**",
                                        "/swagger-ui.html",
                                        "/swagger-ui/**",
                                        "/oauth/**",
                                        "/kakao/**"
                                ).permitAll() // 인증 없이 접근 가능한 경로 설정
                                .anyRequest().authenticated()) // 그 외 모든 요청은 인증 필요
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, userLoginService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
                "/api/auth/login/login",
                "/api/auth/login/refresh",
                "/api/auth/register/**",
                "/api/auth/modify/**",
                "/api/redis/**",
                "/oauth/**",
                "/kakao/**"
        );
    }
}