package com.socialmedia.springmongodb.service;

import java.util.Date;
import java.util.List;
import java.util.HashMap;

import com.socialmedia.springmongodb.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.socialmedia.springmongodb.model.Post;
import com.socialmedia.springmongodb.model.User;
import com.socialmedia.springmongodb.repository.UserRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<List<Post>> getPosts() {
        return new ResponseEntity<>(postRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Post> createPost(String id, Post post) {
        User userInfo = userRepository.findById(id).orElseThrow(()->new SpringSocialMediaException("User id :" + id + " Not Found!"));
        HashMap<String, String> user = new HashMap<String, String>();
        user.put("id", userInfo.getId());
        user.put("username", userInfo.getUsername());
        user.put("email", userInfo.getEmail());
        Post _post = new Post();
        _post.setTitle(post.getTitle());
        _post.setBody(post.getBody());
        _post.setUser(user);
        _post.setCreated(new Date());
        postRepository.save(_post);
        return new ResponseEntity<>(_post, HttpStatus.CREATED);
    }
}