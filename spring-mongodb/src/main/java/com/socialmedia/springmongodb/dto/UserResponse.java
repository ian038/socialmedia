package com.socialmedia.springmongodb.dto;

import java.util.Date;

public class UserResponse {
    private String id;
    private String username;
    private String email;
    private Date created;
    private Date updated;

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

    public Date getCreatedDate() {
        return created;
    }

    public Date getUpdatedDated() {
        return updated;
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

    public void setCreatedDate(Date created) {
        this.created = created;
    }

    public void setUpdatedDate(Date updated) {
        this.created = updated;
    }
}
