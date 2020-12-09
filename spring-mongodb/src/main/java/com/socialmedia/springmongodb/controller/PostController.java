package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.*;

import com.socialmedia.springmongodb.model.Post;
import com.socialmedia.springmongodb.service.PostService;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;
  
    @GetMapping("/")
    public ResponseEntity<?> getPosts() {
        return postService.getPosts();
    }

    @PostMapping("/new/{id}")
    public ResponseEntity<Post> createPost(@PathVariable("id") String id, @Valid @RequestBody Post post) {
        return postService.createPost(id, post);
    }
}
