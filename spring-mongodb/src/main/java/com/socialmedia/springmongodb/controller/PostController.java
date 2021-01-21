package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.validation.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.socialmedia.springmongodb.dto.Photo;
import com.socialmedia.springmongodb.model.Comment;
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

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostbyId(@PathVariable("id") String id) {
        return postService.getPostbyId(id);
    }

    @PostMapping(value = "/new/{userId}", consumes = "multipart/form-data")
    public ResponseEntity<Object> createPost(@PathVariable("userId") String userId, @Valid @RequestPart("post") Post post, @RequestPart("image") @Valid @NotBlank @NotNull MultipartFile file) {
        return postService.createPost(userId, post, file);
    }

    @GetMapping("/by/{userId}")
    public ResponseEntity<?> getPostByUser(@PathVariable("userId") String userId) {
        return postService.getPostByUser(userId);
    }

    @GetMapping(value = "/photo/{id}", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    public void getPostPhoto(@PathVariable("id") String id, HttpServletResponse response)throws IllegalStateException, IOException {
        Photo photo = postService.getPostPhoto(id);
        FileCopyUtils.copy(photo.getStream(), response.getOutputStream());
    }

    @PutMapping(value = "/update/{userId}/{postId}", consumes = "multipart/form-data")
    public ResponseEntity<Object> updateUser(@PathVariable("userId") String userId, @PathVariable("postId") String postId, @Valid @RequestPart("post") Post post, @RequestPart("image") @Valid @NotBlank @NotNull MultipartFile file) {
        return postService.updatePost(userId, postId, post, file);
    }

    @DeleteMapping("/delete/{userId}/{postId}") 
    public ResponseEntity<String> deletePost(@PathVariable("userId") String userId, @PathVariable("postId") String postId) {
        return postService.deletePost(userId, postId);
    }

    @PutMapping("/like/{userId}/{postId}")
    public ResponseEntity<Object> like(@PathVariable("userId") String userId, @PathVariable("postId") String postId) {
        return postService.like(userId, postId);
    }

    @PutMapping("/unlike/{userId}/{postId}")
    public ResponseEntity<Object> unlike(@PathVariable("userId") String userId, @PathVariable("postId") String postId) {
        return postService.unlike(userId, postId);
    }

    @PutMapping("/comment/{userId}/{postId}")
    public ResponseEntity<Object> comment(@PathVariable("userId") String userId, @PathVariable("postId") String postId, @Valid @RequestBody Comment comments) {
        return postService.comment(userId, postId, comments);
    }

    @PutMapping("/uncomment/{commentId}/{postId}")
    public ResponseEntity<Object> uncomment(@PathVariable("commentId") String commentId, @PathVariable("postId") String postId) {
        return postService.uncomment(commentId, postId);
    }
}
