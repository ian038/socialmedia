package com.socialmedia.springmongodb.service;

import java.util.List;

import com.socialmedia.springmongodb.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.socialmedia.springmongodb.model.Post;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public ResponseEntity<List<Post>> getPosts() {
        return new ResponseEntity<>(postRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Post> createPost(Post post) {
        Post _post = postRepository.save(new Post(post.getTitle(), post.getBody()));
        return new ResponseEntity<>(_post, HttpStatus.CREATED);
    }
}