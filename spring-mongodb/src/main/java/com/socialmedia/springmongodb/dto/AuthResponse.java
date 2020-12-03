package com.socialmedia.springmongodb.dto;

import java.time.Instant;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthResponse {
    private String authenticationToken;
    private String username;
    private String refreshToken;
    private Instant expiration;

    public AuthResponse(String authenticationToken, String username, String refreshToken, Instant expiration) {
        this.authenticationToken = authenticationToken;
        this.username = username;
        this.refreshToken = refreshToken;
        this.expiration = expiration;
    }

    public String getAuthenticationToken() {
        return authenticationToken;
    }

    public String getUsername() {
        return username;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Instant getExpiration() {
        return expiration;
    }
}
