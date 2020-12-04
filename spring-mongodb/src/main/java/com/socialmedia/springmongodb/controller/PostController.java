package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import javax.validation.*;

import com.socialmedia.springmongodb.model.Post;
import com.socialmedia.springmongodb.repository.PostRepository;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    PostRepository postRepository;
  
    @GetMapping("/")
    public ResponseEntity<List<Post>> getPosts() {
        return new ResponseEntity<>(postRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) {
        Post _post = postRepository.save(new Post(post.getTitle(), post.getBody()));
        return new ResponseEntity<>(_post, HttpStatus.CREATED);
    }
}
