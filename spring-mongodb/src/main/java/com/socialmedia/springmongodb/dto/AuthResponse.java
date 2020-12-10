package com.socialmedia.springmongodb.dto;

import java.time.Instant;

public class AuthResponse {
    private String authenticationToken;
    private String username;
    private String refreshToken;
    private Instant expiration;

    public AuthResponse() {
    }

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

    public void setAuthenticationToken(String authenticationToken) {
        this.authenticationToken = authenticationToken;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setExpiration(Instant expiration) {
        this.expiration = expiration;
    }
}
