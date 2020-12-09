package com.socialmedia.springmongodb.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;
import javax.websocket.Decoder.Binary;

import java.util.Date;
import java.util.HashMap;

@Document(collection = "posts")
public class Post {
    @Id 
    private String id;

    @Size(min = 4, max = 150, message = "Post title should have at least 4 characters and should not be more than 150 characters long")
    private String title;

    @Size(min = 4, max = 2000, message = "Post body should have at least 4 characters and should not be more than 2000 characters long")
    private String body;

    private Binary photo;

    private HashMap<String, String> postedBy = new HashMap<String, String>(); 

    @CreatedDate
    private Date created;

    private Date updated;
  
    public Post() {
    }
  
    public String getId() {
      return id;
    }

    public void setId(String id) {
      this.id = id;
    }
  
    public String getTitle() {
      return title;
    }
  
    public void setTitle(String title) {
      this.title = title;
    }
  
    public String getBody() {
      return body;
    }
  
    public void setBody(String body) {
      this.body = body;
    }

    public Binary getPhoto() {
      return photo;
    }

    public void setPhoto(Binary photo) {
      this.photo = photo;
    }

    public HashMap<String, String> getPostedBy() {
      return postedBy;
  }

  public void setPostedBy(HashMap<String, String> postedBy) {
      this.postedBy = postedBy;
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
}
