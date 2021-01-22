package com.socialmedia.springmongodb.model;

import java.util.Date;
import java.util.HashMap;

import javax.validation.constraints.*;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {
    private String id;

    @NotEmpty(message = "Comment cannot be empty")
    @Size(max = 150, message = "Comment should not be more than 150 characters long")
    private String text;

    private Date created;
    private HashMap<String, String> postedBy = new HashMap<String, String>(); 

    public Comment() {
    }

    public String getId() {
        return id;
    }
  
    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public HashMap<String, String> getPostedBy() {
        return postedBy;
    }
  
    public void setPostedBy(HashMap<String, String> postedBy) {
        this.postedBy = postedBy;
    }
}
