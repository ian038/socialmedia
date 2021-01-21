package com.socialmedia.springmongodb.dto;

public class Follow {
    private String id;
    private String username;

    public Follow() {
    }

    public String getId() {
        return id;
    }
  
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
}

