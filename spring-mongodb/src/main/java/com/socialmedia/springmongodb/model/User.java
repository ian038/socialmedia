package com.socialmedia.springmongodb.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.*;
import java.util.Date;
import java.util.Set;

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

    @CreatedDate
    private Date created;

    @LastModifiedDate
    private Date updated;
    
    @DBRef
    private Set<Role> roles;

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

    public Set<Role> getRoles() {
      return roles;
  }

  public void setRoles(Set<Role> roles) {
      this.roles = roles;
  }

  public void removeSalt(String salt) {
    this.salt = "";
  }

  public void removePassword(String hashed_password) {
    this.hashed_password = "";
  }
}
