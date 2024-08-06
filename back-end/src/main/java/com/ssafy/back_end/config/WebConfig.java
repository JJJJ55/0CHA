package com.ssafy.back_end.config;

import com.ssafy.back_end.util.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")  // 모든 출처 허용1
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Autowired
    public WebConfig(JwtInterceptor jwtInterceptor) {
        this.jwtInterceptor = jwtInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/api/**") // 인터셉터를 적용할 경로
//                .excludePathPatterns("/api/auth/**") // 인터셉터를 제외할 경로
                .excludePathPatterns("/api/auth/login/login") // 인터셉터를 제외할 경로
                .excludePathPatterns("/api/auth/register/**") // 인터셉터를 제외할 경로
                .excludePathPatterns("/api/auth/modify/**") // 인터셉터를 제외할 경로
                .excludePathPatterns("/api/redis/**")
                .excludePathPatterns("/api/workout/**")
                .excludePathPatterns("/api/sns/**")
                .excludePathPatterns("/api/routine/**");
    }
}