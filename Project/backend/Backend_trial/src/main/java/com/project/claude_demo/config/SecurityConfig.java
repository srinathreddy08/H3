package com.project.claude_demo.config;

import org.aspectj.weaver.patterns.IToken;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/", "/home", "/api/safety/**", "/api/wellness/**").permitAll()
                        .anyRequest().authenticated()
                ).csrf(token->token.disable());

//                .oauth2Login(oauth2 -> oauth2
//                        .loginPage("/login")
//                        .defaultSuccessUrl("/wellness", true)
//                )
//                .logout(logout -> logout
//                        .logoutSuccessUrl("/")
//                );
        return http.build();
    }
}