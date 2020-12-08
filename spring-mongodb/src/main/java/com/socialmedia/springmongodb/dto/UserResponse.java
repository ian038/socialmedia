package com.socialmedia.springmongodb.dto;

public class UserResponse {
    private String id;
    private String username;
    private String email;

    public UserResponse() {
	}

	public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

	public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
