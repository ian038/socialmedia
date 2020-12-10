package com.socialmedia.springmongodb.dto;

import java.time.Instant;

public class AuthResponse {
    private String authenticationToken;
    private String userId;
    private String username;
    private String userEmail;
    private Instant expiration;

    public AuthResponse() {
    }

    public AuthResponse(String authenticationToken, String username, Instant expiration) {
        this.authenticationToken = authenticationToken;
        this.username = username;
        this.expiration = expiration;
    }

    public String getAuthenticationToken() {
        return authenticationToken;
    }

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public Instant getExpiration() {
        return expiration;
    }

    public void setAuthenticationToken(String authenticationToken) {
        this.authenticationToken = authenticationToken;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setExpiration(Instant expiration) {
        this.expiration = expiration;
    }
}
