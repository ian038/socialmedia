package com.socialmedia.springmongodb.dto;

import java.time.Instant;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {
    private String authenticationToken;
    private Instant expiration;
	private String refreshToken;
	private String id;
	private String username;
	private String email;
	private List<String> roles;

	public JwtResponse(String authenticationToken, Instant expiration, String refreshToken, String id, String username, String email, List<String> roles) {
        this.authenticationToken = authenticationToken;
        this.expiration = expiration;
        this.refreshToken = refreshToken;
		this.id = id;
		this.username = username;
        this.email = email;
		this.roles = roles;
	}

	public String getAuthenticationToken() {
		return authenticationToken;
    }
    
    public Instant getExpiration() {
        return expiration;
    }

	public String getRefreshToken() {
		return refreshToken;
	}

	public String getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public String getUsername() {
		return username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
