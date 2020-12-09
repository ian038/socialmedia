package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.*;

import com.socialmedia.springmongodb.model.Post;
import com.socialmedia.springmongodb.service.PostService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;
  
    @GetMapping("/")
    public ResponseEntity<?> getPosts() {
        return postService.getPosts();
    }

    @PostMapping("/new/{userId}")
    public ResponseEntity<Post> createPost(@PathVariable("userId") String userId, @Valid @RequestBody Post post) {
        return postService.createPost(userId, post);
    }

    @GetMapping("/by/{userId}")
    public ResponseEntity<?> getPostByUser(@PathVariable("userId") String userId) {
        return postService.getPostByUser(userId);
    }

    @PutMapping("/update/{userId}/{postId}")
    public ResponseEntity<Object> updateUser(@PathVariable("userId") String userId, @PathVariable("postId") String postId, @Valid @RequestBody Post post) {
        return postService.updatePost(userId, postId, post);
    }

    @DeleteMapping("/delete/{userId}/{postId}") 
    public ResponseEntity<String> deletePost(@PathVariable("userId") String userId, @PathVariable("postId") String postId) {
        return postService.deletePost(userId, postId);
    }
}
