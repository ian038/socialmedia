package com.socialmedia.springmongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

@Document(collection = "posts")
public class Post {
    @Id 
    private String id;

    @Size(min = 4, max = 150, message = "Post title should have at least 4 characters and should not be more than 150 characters long")
    private String title;

    @Size(min = 4, max = 2000, message = "Post body should have at least 4 characters and should not be more than 2000 characters long")
    private String body;
  
    public Post(String title, String body) {
      this.title = title;
      this.body = body;
    }
  
    public String getId() {
      return id;
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
}
