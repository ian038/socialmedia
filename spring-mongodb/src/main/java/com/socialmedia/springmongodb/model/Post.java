package com.socialmedia.springmongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import com.socialmedia.springmongodb.dto.LikeUnlike;

import java.util.ArrayList;
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

    private String photo;

    private HashMap<String, String> postedBy = new HashMap<String, String>(); 

    private Date created;

    private Date updated;

    private ArrayList<LikeUnlike> likes = new ArrayList<LikeUnlike>();

    private ArrayList<Comment> comments = new ArrayList<Comment>();
  
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

    public String getPhoto() {
      return photo;
    }

    public void setPhoto(String photo) {
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

    public ArrayList<LikeUnlike> getLikes() {
      return likes;
    }

    public void setLikes(ArrayList<LikeUnlike> likes) {
      this.likes = likes;
    }

    public void addLike(LikeUnlike like) {
      this.likes.add(like);
    }

    public ArrayList<Comment> getComments() {
      return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
      this.comments = comments;
    }

    public void addComment(Comment comment) {
      this.comments.add(comment);
    }
}
