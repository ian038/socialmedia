package com.socialmedia.springmongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.*;

import com.socialmedia.springmongodb.dto.Follow;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

@Document(collection = "users")
public class User {
    @Id 
    private String id;

    @NotEmpty(message = "Username cannot be empty")
    private String username;

    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    private String hashed_password;

    private String salt;

    private Date created;

    private Date updated;

    private String photo;

    private String about;

    private ArrayList<Follow> followers = new ArrayList<Follow>();

    private ArrayList<Follow> following = new ArrayList<Follow>();

    private String passwordResetToken; 

    public User() {
    }

    public User(String id, String username, String email) {
      this.id = id;
      this.username = username;
      this.email = email;
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
  
    public String getEmail() {
      return email;
    }
  
    public void setEmail(String email) {
      this.email = email;
    }

    public String getPassword() {
        return hashed_password;
    }

    public void setPassword(String hashed_password) {
        this.hashed_password = hashed_password;
    }

    public String getSalt() {
        return salt;
    }
    
    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Date getCreated() {
      return created;
    }
  
    public void setCreated(Date created) {
      this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }
    
    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public String getPhoto() {
      return photo;
    }

    public void setPhoto(String photo) {
      this.photo = photo;
    }

    public String getAbout() {
      return about;
    }

    public void setAbout(String about) {
      this.about = about;
    }

    public ArrayList<Follow> getFollowers() {
      return followers;
    }

    public void addFollower(Follow follower) {
      this.followers.add(follower);
    }

    public ArrayList<Follow> getFollowing() {
      return following;
    }

    public void addFollowing(Follow follow) {
      this.following.add(follow);
    }

    public String getPasswordResetToken() {
      return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
      this.passwordResetToken = passwordResetToken;
    }
}
