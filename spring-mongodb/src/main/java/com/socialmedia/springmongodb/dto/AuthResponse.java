package com.socialmedia.springmongodb.dto;

public class AuthResponse {
    private String authenticationToken;
    private String username;

    public AuthResponse(String authenticationToken, String username) {
        this.authenticationToken = authenticationToken;
        this.username = username;
    }

    public String getAuthenticationToken() {
        return authenticationToken;
    }

    public String getUsername() {
        return username;
    }
}
