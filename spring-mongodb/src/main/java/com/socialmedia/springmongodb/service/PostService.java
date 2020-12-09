package com.socialmedia.springmongodb.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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

    public ResponseEntity<Post> createPost(String userId, Post post) {
        User userInfo = userRepository.findById(userId)
                .orElseThrow(() -> new SpringSocialMediaException("User id :" + userId + " Not Found!"));
        HashMap<String, String> user = new HashMap<String, String>();
        user.put("id", userInfo.getId());
        user.put("username", userInfo.getUsername());
        Post _post = new Post();
        _post.setTitle(post.getTitle());
        _post.setBody(post.getBody());
        _post.setPostedBy(user);
        _post.setCreated(new Date());
        postRepository.save(_post);
        return new ResponseEntity<>(_post, HttpStatus.CREATED);
    }

    public ResponseEntity<List<Post>> getPostByUser(String userId) {
        List<Post> postedBy = postRepository.findByUserId(userId);
        for (int i = 0; i < postedBy.size(); i++) {
            System.out.println(postedBy.get(i).getId());
        }
        return new ResponseEntity<>(postRepository.findByUserId(userId), HttpStatus.OK);
    }

    public ResponseEntity<Object> updatePost(String userId, String postId, Post postRequest) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        HashMap<String, String> postedByInfo = new HashMap<String, String>();
        postedByInfo = post.getPostedBy();
        if(!userId.equals(postedByInfo.get("id"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }
        post.setTitle(postRequest.getTitle());
        post.setBody(postRequest.getBody());
        post.setUpdated(new Date());
        postRepository.save(post);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    public ResponseEntity<String> deletePost(String userId, String postId) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        HashMap<String, String> postedByInfo = new HashMap<String, String>();
        try {
            postedByInfo = post.getPostedBy();
            if(!userId.equals(postedByInfo.get("id"))) {
                return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
            }
            postRepository.deleteById(postId);
            return new ResponseEntity<>("Post deleted successfully!", HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}